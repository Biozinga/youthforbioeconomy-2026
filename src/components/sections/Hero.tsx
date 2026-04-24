// Directive Next.js: ce composant utilise un état React et doit donc être rendu côté client.
'use client';

// Import du hook useState pour ouvrir ou fermer la fenêtre modale de contact.
import { useState } from 'react';
// Import du composant Lottie pour afficher l'animation JSON illustrant la boucle biologique.
import Lottie from 'lottie-react';
// Import des données d'animation Lottie placées dans le dossier public.
import sensorAnimation from '../../../public/sensor-animation.json';

/**
 * Composant Hero - Section d'accueil principale avec présentation de la plateforme
 * Affiche une visualisation Lottie autour de la boucle déchets, larves, engrais et tokens
 */
export function Hero() {
  // État pour contrôler l'affichage du formulaire de contact partenaire.
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

        {/* Animation Lottie représentant la boucle de revalorisation. */}
        <div className="hero-image">
          {/* Zone de cadrage de l'animation pour garder une taille stable. */}
          <div className="sensor-visualization">
            {/* Animation principale de la boucle biologique. */}
            <Lottie
              // Données JSON importées depuis public/sensor-animation.json.
              animationData={sensorAnimation}
              // Répète l'animation en continu.
              loop={true}
              // Lance automatiquement l'animation au chargement.
              autoplay={true}
              // Taille fixe de l'animation dans la section hero.
              style={{ width: '300px', height: '300px' }}
            />
          </div>
        </div>
      </div>

      {/* Modal pour la prise de contact partenaire */}
      {showDemo && (
        // Overlay pleine page; un clic hors de la modale ferme la fenêtre.
        <div className="modal-overlay" onClick={() => setShowDemo(false)}>
          {/* stopPropagation empêche le clic dans la modale de fermer l'overlay. */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Bouton de fermeture */}
            <button className="modal-close" onClick={() => setShowDemo(false)}>
              ×
            </button>

            {/* Titre du formulaire */}
            <h2>Devenir partenaire</h2>

            {/* Animation Lottie dans le modal */}
            <div className="demo-animation">
              {/* Version réduite de l'animation pour illustrer le formulaire. */}
              <Lottie
                // Réutilise la même animation que la section hero.
                animationData={sensorAnimation}
                // Répète l'animation dans la modale.
                loop={true}
                // Lance l'animation dès l'ouverture de la modale.
                autoplay={true}
                // Centre et dimensionne l'animation dans le formulaire.
                style={{ width: '150px', height: '150px', margin: '0 auto 20px' }}
              />
            </div>

            {/* Formulaire de contact */}
            <form className="demo-form">
              {/* Champ obligatoire pour connaître le nom du visiteur. */}
              <input type="text" placeholder="Votre nom" required />
              {/* Champ obligatoire pour pouvoir recontacter le visiteur. */}
              <input type="email" placeholder="Votre email" required />
              {/* Champ optionnel pour identifier l'organisation du visiteur. */}
              <input type="text" placeholder="Votre exploitation ou organisation" />
              {/* Champ libre pour recueillir une demande ou un contexte. */}
              <textarea placeholder="Déchets céréaliers, élevage, besoin en larves ou engrais..." />
              {/* Bouton de soumission visuel du formulaire de contact. */}
              <button type="submit" className="btn btn-primary">
                Prendre contact
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
