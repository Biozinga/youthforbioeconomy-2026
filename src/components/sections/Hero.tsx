// Directive Next.js: ce composant affiche une animation Lottie côté client.
'use client';

// Import du composant Lottie pour afficher l'animation JSON de la section principale.
import Lottie from 'lottie-react';
// Import du hook qui déclenche les animations uniquement quand la section est visible.
import { useInView } from '@/hooks/useInView';
// Import des données d'animation Lottie retenues pour la page d'accueil.
import farmingAnimation from '../../../lottiefiles/Animation - 1706084188549.json';

/**
 * Composant Hero - Section d'accueil principale avec présentation de la plateforme
 * Affiche une visualisation Lottie autour de la boucle déchets, larves et engrais
 */
export function Hero() {
  // Observe la section pour ne lancer l'animation Lottie que lorsque le hero est visible.
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.28 });

  // Retourne la section hero complète avec texte et animation.
  return (
    // Section d'introduction visible en haut de page.
    <section id="top" className={`hero ${isInView ? 'is-in-view' : ''}`} ref={ref}>
      {/* Conteneur alignant le texte et l'animation sur une grille responsive. */}
      <div className="container hero-content">
        {/* Contenu texte de la section accueil. */}
        <div className="hero-text">
          {/* Titre principal orienté vision plutôt que simple description produit. */}
          <h1>
            <span className="hero-title-main">Et si la bio-ingénierie...</span>
            <span className="hero-title-secondary">
              révélait tout le potentiel de vos déchets agricoles ?
            </span>
          </h1>
          {/* Sous-titre qui précise la promesse utilisateur et le rôle de la plateforme. */}
          <p className="hero-subtitle">
            Nous connectons agriculteurs, éleveurs et insectes pour transformer les coproduits
            céréaliers en protéines locales pour les volailles, puis en fertilisants qui retournent
            aux sols.
          </p>
          {/* Indicateurs rapides qui rendent la promesse concrète dès le premier écran. */}
          <div className="hero-features" aria-label="Impacts principaux de la solution">
            <span>Coproduits valorisés</span>
            <span>Protéines locales</span>
            <span>Sols régénérés</span>
          </div>
          {/* Lien direct vers le simulateur de revalorisation. */}
          <div className="hero-buttons">
            <a className="btn btn-primary" href="#simulation">
              Simuler une revalorisation
            </a>
          </div>
        </div>

        {/* Animation Lottie représentant la valorisation des flux agricoles. */}
        <div className="hero-image">
          {/* Carte visuelle premium qui met en scène l'animation de boucle agricole. */}
          <div className="hero-visual-card">
            {/* Zone de cadrage de l'animation pour garder une taille stable. */}
            <div className="cycle-visualization">
              {/* Animation principale de la section hero. */}
              {isInView && (
                <Lottie
                  // Données JSON importées depuis lottiefiles/Animation - 1706084188549.json.
                  animationData={farmingAnimation}
                  // Répète l'animation en continu.
                  loop={true}
                  // Lance automatiquement l'animation seulement quand la section est visible.
                  autoplay={true}
                  // Taille de l'animation dans la section hero.
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </div>
            {/* Trois métriques de lecture rapide sous l'animation. */}
            <div className="hero-visual-stats">
              <div>
                <strong>01</strong>
                <span>collecter</span>
              </div>
              <div>
                <strong>02</strong>
                <span>convertir</span>
              </div>
              <div>
                <strong>03</strong>
                <span>restituer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
