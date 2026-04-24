// Directive Next.js: ce composant utilise un état React et doit donc être rendu côté client.
'use client';

// Import du hook useState pour ouvrir ou fermer la fenêtre modale de contact.
import { useState } from 'react';
// Import du composant Lottie pour afficher l'animation JSON illustrant l'agriculture connectée.
import Lottie from 'lottie-react';
// Import des données d'animation Lottie représentant une ferme connectée avec drone.
import farmingAnimation from '../../../lottiefiles/IoT digital farming with drone.json';

/**
 * Composant Hero - Section d'accueil principale avec présentation de la plateforme
 * Affiche une visualisation Lottie autour de la boucle déchets, larves, engrais et tokens
 */
export function Hero() {
  // État pour contrôler l'affichage de la pop-up de choix partenaire.
  const [showDemo, setShowDemo] = useState(false);

  // Retourne la section hero complète: texte, animation et modale optionnelle.
  return (
    // Section d'introduction visible en haut de page.
    <section className="hero">
      {/* Conteneur alignant le texte et l'animation sur une grille responsive. */}
      <div className="container hero-content">
        {/* Contenu texte de la section accueil */}
        <div className="hero-text">
          {/* Titre principal décrivant le produit présenté. */}
          <h1>Plateforme de Revalorisation Agricole</h1>
          {/* Sous-titre qui précise la promesse utilisateur. */}
          <p className="hero-subtitle">
            Nous transformons les déchets de l&apos;agriculture céréalière en tokens, larves pour
            l&apos;alimentation des poulets et engrais organiques.
          </p>

          {/* Boutons d'action */}
          <div className="hero-buttons">
            {/* Ouvre la modale de prise de contact au clic. */}
            <button className="btn btn-primary" onClick={() => setShowDemo(true)}>
              Rejoindre la boucle
            </button>
          </div>
        </div>

        {/* Animation Lottie représentant l'agriculture connectée et la valorisation des flux. */}
        <div className="hero-image">
          {/* Zone de cadrage de l'animation pour garder une taille stable. */}
          <div className="cycle-visualization">
            {/* Animation principale de la ferme connectée avec drone. */}
            <Lottie
              // Données JSON importées depuis lottiefiles/IoT digital farming with drone.json.
              animationData={farmingAnimation}
              // Répète l'animation en continu.
              loop={true}
              // Lance automatiquement l'animation au chargement.
              autoplay={true}
              // Taille de l'animation dans la section hero.
              style={{ width: '420px', height: '420px' }}
            />
          </div>
        </div>
      </div>

      {/* Modal pour choisir le type de participation à la boucle */}
      {showDemo && (
        // Overlay pleine page; un clic hors de la modale ferme la fenêtre.
        <div className="modal-overlay" onClick={() => setShowDemo(false)}>
          {/* stopPropagation empêche le clic dans la modale de fermer l'overlay. */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Bouton de fermeture */}
            <button className="modal-close" onClick={() => setShowDemo(false)}>
              ×
            </button>

            {/* Titre de la pop-up */}
            <h2>Rejoindre la boucle</h2>
            {/* Phrase courte pour orienter l'utilisateur vers le bon parcours. */}
            <p className="modal-intro">
              Choisissez ce que vous souhaitez faire avec la plateforme.
            </p>

            {/* Deux parcours principaux proposés aux visiteurs. */}
            <div className="modal-choice-grid">
              {/* Parcours pour les agriculteurs qui apportent des déchets céréaliers. */}
              <button className="choice-card" type="button" onClick={() => setShowDemo(false)}>
                <span className="choice-icon">🌾</span>
                <span className="choice-title">Je souhaite valoriser mes déchets</span>
                <span className="choice-description">
                  Déposez vos déchets agricoles et recevez des tokens utilisables dans la boucle.
                </span>
              </button>

              {/* Parcours pour les utilisateurs qui veulent acheter les produits issus de la valorisation. */}
              <button className="choice-card" type="button" onClick={() => setShowDemo(false)}>
                <span className="choice-icon">🌱</span>
                <span className="choice-title">Je souhaite acheter des produits valorisés</span>
                <span className="choice-description">
                  Accédez à des larves pour poulets et à des engrais organiques issus des déchets.
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
