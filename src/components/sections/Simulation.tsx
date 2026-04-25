// Directive Next.js: cette section ouvre une pop-up et doit être rendue côté client.
'use client';

// Import du hook useState pour contrôler l'ouverture de la pop-up.
import { useState } from 'react';
// Import du composant Lottie pour afficher l'animation de ferme connectée.
import Lottie from 'lottie-react';
// Import de l'animation de ferme connectée avec drone.
import droneFarmAnimation from '../../../lottiefiles/IoT digital farming with drone.json';

/**
 * Composant Simulation - Dernière section de la page
 * Propose une entrée de simulation pour revendre des déchets agricoles ou avicoles
 */
export function Simulation() {
  // État qui indique si la pop-up de choix de simulation est ouverte.
  const [isOpen, setIsOpen] = useState(false);

  // Retourne la section de simulation et sa pop-up moderne.
  return (
    // Section finale qui invite l'utilisateur à lancer une simulation.
    <section id="simulation" className="simulation">
      {/* Conteneur central pour garder le contenu aligné avec le reste de la page. */}
      <div className="container simulation-content">
        {/* Bloc texte principal de la section. */}
        <div className="simulation-copy">
          {/* Titre demandé pour la section. */}
          <h2>Je simule une revalorisation de déchet</h2>
          {/* Description courte qui explique l'action attendue. */}
          <p>
            Choisissez votre flux de matière, puis estimez comment il peut entrer dans une boucle
            locale de protéines, d&apos;engrais et de revenus territoriaux.
          </p>
        </div>

        {/* Colonne d'action qui place l'animation directement au-dessus du bouton. */}
        <div className="simulation-action">
          {/* Animation illustrative placée dans la section de simulation. */}
          <div className="simulation-animation">
            <Lottie
              // Données JSON importées depuis lottiefiles/IoT digital farming with drone.json.
              animationData={droneFarmAnimation}
              // Répète l'animation pour garder une interface vivante.
              loop={true}
              // Lance automatiquement l'animation quand la section est visible.
              autoplay={true}
              // L'animation remplit son cadre CSS.
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Bouton principal qui ouvre la pop-up de simulation. */}
          <button
            className="btn btn-primary simulation-button"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            Lancer la simulation
          </button>
        </div>
      </div>

      {/* Pop-up affichée uniquement lorsque l'utilisateur lance la simulation. */}
      {isOpen && (
        // Overlay plein écran; un clic à l'extérieur ferme la pop-up.
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          {/* Panneau de simulation; stopPropagation évite la fermeture au clic interne. */}
          <div className="modal simulation-modal" onClick={(event) => event.stopPropagation()}>
            {/* Bouton de fermeture de la pop-up. */}
            <button className="modal-close" type="button" onClick={() => setIsOpen(false)}>
              ×
            </button>

            {/* Titre de la pop-up. */}
            <h2>Quel déchet souhaitez-vous revendre ?</h2>
            {/* Phrase d'aide pour orienter le choix utilisateur. */}
            <p className="modal-intro">
              Sélectionnez le flux qui correspond à votre exploitation pour démarrer la simulation.
            </p>

            {/* Deux choix de simulation proposés dans une grille moderne. */}
            <div className="simulation-choice-grid">
              {/* Choix pour les résidus issus des cultures céréalières. */}
              <button
                className="simulation-choice-card"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <span className="simulation-choice-label">Culture céréalière</span>
                <span className="simulation-choice-title">
                  Revendre des déchets de culture céréalière
                </span>
                <span className="simulation-choice-description">
                  Pailles, sons, issues de nettoyage ou coproduits végétaux pouvant alimenter une
                  unité de bioconversion par insectes.
                </span>
              </button>

              {/* Choix pour les déchets biologiques issus d'élevage de volaille. */}
              <button
                className="simulation-choice-card"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <span className="simulation-choice-label">Élevage de volaille</span>
                <span className="simulation-choice-title">
                  Revendre des déchets biologiques d&apos;élevage
                </span>
                <span className="simulation-choice-description">
                  Fientes, litières et matières organiques pouvant être stabilisées en amendement
                  organique pour les sols.
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
