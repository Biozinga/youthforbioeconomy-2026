// Directive Next.js: cette section utilise Lottie et doit être rendue côté client.
'use client';

// Import du composant Lottie pour afficher l'animation agricole moderne.
import Lottie from 'lottie-react';
// Import du hook qui déclenche l'animation seulement quand la section est visible.
import { useInView } from '@/hooks/useInView';
// Import des données de l'animation placée dans le dossier lottiefiles.
import modernFarmAnimation from '../../../lottiefiles/modern farm.json';

/**
 * Composant Features - Section des avantages clés de la plateforme
 * Affiche une animation représentant la boucle agricole complète
 */
export function Features() {
  // Observe la section pour différer le lancement de l'animation Lottie.
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.25 });

  // Retourne la section présentant la boucle agricole sous forme d'animation.
  return (
    // Section ancrée par l'identifiant benefits pour la navigation interne.
    <section id="benefits" className="features" ref={ref}>
      {/* Conteneur central qui limite la largeur du contenu. */}
      <div className="container">
        {/* Mise en page alternée avec animation à gauche et texte à droite. */}
        <div className="features-showcase">
          {/* Animation remplaçant les anciennes cartes explicatives de la boucle. */}
          <div className="features-animation">
            {isInView && (
              <Lottie
                // Données JSON importées depuis lottiefiles/modern farm.json.
                // TODO: remplacer les moutons de cette animation par des poules si nous avons le temps.
                animationData={modernFarmAnimation}
                // Répète l'animation pour donner une sensation de cycle continu.
                loop={true}
                // Lance automatiquement l'animation quand la section est affichée.
                autoplay={true}
                // Taille responsive contrôlée aussi par le conteneur CSS.
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>

          {/* Texte explicatif placé à droite pour alterner avec le hero. */}
          <div className="features-copy">
            {/* Titre de la section */}
            <h2>Une boucle agricole complète</h2>
            {/* Sous-titre descriptif */}
            <p>
              Les coproduits du blé, paille, sons et issues de nettoyage, sont préparés puis confiés
              à une unité de bioconversion par insectes.
            </p>
            <p>
              Les larves convertissent cette biomasse en protéines et lipides pour l&apos;élevage
              avicole local. Les fientes sont ensuite stabilisées en amendement organique, rendu aux
              sols céréaliers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
