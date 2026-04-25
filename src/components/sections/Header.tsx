// Import de la configuration globale du site et des liens de navigation.
import { navigation, siteConfig } from '@/lib/config';

/**
 * Composant Header - En-tête simple du site
 * Affiche le nom du projet et les liens principaux de navigation
 */
export function Header() {
  // Retourne un en-tête léger, lisible et réutilisable sur la page d'accueil.
  return (
    // Header principal affiché en haut du site.
    <header className="site-header">
      {/* Conteneur central qui aligne la marque et la navigation. */}
      <div className="container site-header-content">
        {/* Lien de marque qui ramène vers le haut de la page. */}
        <a className="site-brand" href="#top">
          {/* Pastille visuelle courte pour donner un repère graphique au nom du projet. */}
          <span className="site-brand-mark">YB</span>
          {/* Nom public du site depuis la configuration globale. */}
          <span>{siteConfig.name}</span>
        </a>

        {/* Navigation principale du site. */}
        <nav className="site-nav" aria-label="Navigation principale">
          {/* Itération sur les liens déclarés dans src/lib/config.ts. */}
          {navigation.map((item) => (
            // Chaque lien utilise son libellé comme clé car la liste est courte et stable.
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
