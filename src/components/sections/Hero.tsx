// Directive Next.js: ce composant affiche une animation Lottie côté client.
'use client';

// Import du composant Lottie pour afficher l'animation JSON de la section principale.
import Lottie from 'lottie-react';
// Import des données d'animation Lottie retenues pour la page d'accueil.
import farmingAnimation from '../../../lottiefiles/Animation - 1706084188549.json';

/**
 * Composant Hero - Section d'accueil principale avec présentation de la plateforme
 * Affiche une visualisation Lottie autour de la boucle déchets, larves et engrais
 */
export function Hero() {
  // Retourne la section hero complète avec texte et animation.
  return (
    // Section d'introduction visible en haut de page.
    <section id="top" className="hero">
      {/* Conteneur alignant le texte et l'animation sur une grille responsive. */}
      <div className="container hero-content">
        {/* Contenu texte de la section accueil */}
        <div className="hero-text">
          {/* Titre principal décrivant le produit présenté. */}
          <h1>Plateforme de Revalorisation Agricole</h1>
          {/* Sous-titre qui précise la promesse utilisateur. */}
          <p className="hero-subtitle">
            Recycler, relier, relocaliser: nous transformons les coproduits du blé en protéines pour
            volailles et en fertilisants organiques, grâce au vivant comme moteur d&apos;ingénierie.
          </p>
        </div>

        {/* Animation Lottie représentant la valorisation des flux agricoles. */}
        <div className="hero-image">
          {/* Zone de cadrage de l'animation pour garder une taille stable. */}
          <div className="cycle-visualization">
            {/* Animation principale de la section hero. */}
            <Lottie
              // Données JSON importées depuis lottiefiles/Animation - 1706084188549.json.
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
    </section>
  );
}
