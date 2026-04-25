// Directive Next.js: 3Dmol.js dépend du navigateur et doit rester côté client.
'use client';

// Import des hooks React nécessaires au montage du viewer moléculaire.
import { useEffect, useRef } from 'react';

// Structure décrivant une enzyme affichée dans la section.
type Molecule = {
  name: string;
  pdbPath: string;
  role: string;
  accent: string;
};

// Interface minimale du viewer 3Dmol.js utilisée par le composant.
type ThreeDmolViewer = {
  addModel: (data: string, format: string) => void;
  setStyle: (selection: object, style: object) => void;
  zoomTo: () => void;
  render: () => void;
  spin: (axis: string, speed: number) => void;
  resize: () => void;
  clear: () => void;
};

// Interface minimale du module 3Dmol.js chargé dynamiquement.
type ThreeDmolModule = {
  createViewer: (element: HTMLElement, config: object) => ThreeDmolViewer;
};

// Liste des trois enzymes fournies dans le dossier public.
const molecules: Molecule[] = [
  {
    name: 'Cellulase',
    pdbPath: '/1EG1.pdb',
    role: 'Elle ouvre les fibres de cellulose et rend les résidus végétaux plus accessibles au vivant.',
    accent: '#10b981',
  },
  {
    name: 'Xylanase',
    pdbPath: '/1ENX.pdb',
    role: 'Elle fragmente les xylanes présents dans les coproduits céréaliers pour accélérer la bioconversion.',
    accent: '#f59e0b',
  },
  {
    name: 'Phytase',
    pdbPath: '/3K4P.pdb',
    role: 'Elle libère le phosphore piégé dans les végétaux et limite les pertes minérales.',
    accent: '#6366f1',
  },
];

// Composant 3Dmol.js qui affiche une vraie structure protéique en rendu cartoon.
function MoleculeViewer({ molecule }: { molecule: Molecule }) {
  // Référence vers le conteneur DOM où 3Dmol.js injecte son canvas WebGL.
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Monte le viewer moléculaire au rendu client.
  useEffect(() => {
    // Récupère le conteneur courant.
    const container = containerRef.current;

    // Stoppe si le conteneur n'est pas encore disponible.
    if (!container) {
      return;
    }

    // Indique si le composant est encore monté pendant les chargements asynchrones.
    let isMounted = true;
    // Référence mutable vers le viewer pour pouvoir le nettoyer.
    let viewer: ThreeDmolViewer | null = null;

    // Charge 3Dmol.js uniquement dans le navigateur pour éviter toute exécution côté serveur.
    const mountViewer = async () => {
      // Charge la librairie web moléculaire utilisée par des interfaces proches de PyMOL.
      const threeDmol = (await import('3dmol')) as ThreeDmolModule;
      // Charge le fichier PDB depuis le dossier public.
      const pdbText = await fetch(molecule.pdbPath).then((response) => response.text());

      // Stoppe si le composant a été démonté pendant le chargement.
      if (!isMounted) {
        return;
      }

      // Crée le viewer dans la carte.
      viewer = threeDmol.createViewer(container, {
        backgroundColor: 'rgba(0,0,0,0)',
      });
      // Force 3Dmol.js à reprendre les dimensions réelles de la carte avant d'ajouter le modèle.
      viewer.resize();

      // Ajoute le modèle PDB complet.
      viewer.addModel(pdbText, 'pdb');
      // Rendu cartoon: hélices alpha, feuillets bêta et boucles, comme dans les viewers moléculaires.
      viewer.setStyle(
        {},
        {
          cartoon: {
            color: molecule.accent,
            opacity: 0.96,
          },
        }
      );
      // Centre et zoome la protéine dans son cadre.
      viewer.zoomTo();
      // Lance une rotation lente autour de l'axe vertical.
      viewer.spin('y', 0.35);
      // Attend une frame pour laisser le layout CSS stabiliser la taille du canvas injecté.
      requestAnimationFrame(() => {
        // Ajuste une dernière fois la taille du viewer dans sa carte.
        viewer?.resize();
        // Effectue le premier rendu.
        viewer?.render();
      });
    };

    // Démarre le montage du viewer.
    mountViewer();

    // Ajuste le viewer si la carte change de taille.
    const resizeObserver = new ResizeObserver(() => {
      viewer?.resize();
      viewer?.render();
    });
    // Observe le conteneur.
    resizeObserver.observe(container);

    // Nettoie le viewer au démontage.
    return () => {
      // Empêche les callbacks asynchrones d'écrire dans un composant démonté.
      isMounted = false;
      // Stoppe l'observation de taille.
      resizeObserver.disconnect();
      // Nettoie les modèles 3Dmol.js si le viewer existe.
      viewer?.clear();
      // Vide le conteneur, y compris le canvas créé par 3Dmol.js.
      container.replaceChildren();
    };
  }, [molecule]);

  // Retourne le conteneur visuel de la molécule.
  return <div className="molecule-viewer" ref={containerRef} aria-hidden="true" />;
}

// Section présentant la machinerie moléculaire du vivant.
export function Molecules() {
  // Retourne une section avant la simulation pour installer le récit biomoléculaire.
  return (
    <section className="molecules">
      {/* Conteneur aligné avec le reste de la page. */}
      <div className="container">
        {/* En-tête éditorial de la section. */}
        <div className="molecules-header">
          {/* Petit label de contexte scientifique. */}
          <span className="section-badge">Machinerie moléculaire</span>
          {/* Titre de la section. */}
          <h2>Le vivant a déjà conçu les meilleurs outils de transformation.</h2>
          {/* Texte court expliquant notre rôle dans la boucle. */}
          <p>
            Pendant des milliers d&apos;années, l&apos;évolution a optimisé des biomolécules
            capables de découper, libérer et rendre disponible la matière organique. Notre
            plateforme ne remplace pas cette intelligence: elle organise la rencontre entre les
            humains, les flux agricoles et cette machinerie moléculaire.
          </p>
        </div>

        {/* Grille des trois structures 3D. */}
        <div className="molecules-grid">
          {molecules.map((molecule) => (
            <article className="molecule-card" key={molecule.name}>
              {/* Structure 3D rotative issue du fichier PDB. */}
              <MoleculeViewer molecule={molecule} />
              {/* Texte de la carte. */}
              <div className="molecule-card-copy">
                <h3>{molecule.name}</h3>
                <p>{molecule.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
