/**
 * Configuration globale du site
 * Contient les informations de base et les liens externes
 */

// Configuration principale du site
export const siteConfig = {
  // Nom du site affiché dans le titre
  name: 'Plateforme de Revalorisation Agricole',
  // Description courte pour SEO
  description: 'Transformation des déchets céréaliers en tokens, larves et engrais organiques',
  // URL de base du site
  url: 'https://revalorisation-agricole.com',
  // Image pour les réseaux sociaux
  ogImage: 'https://revalorisation-agricole.com/og-image.png',
  // Liens vers les réseaux sociaux
  links: {
    // URL du compte Twitter/X associé au projet.
    twitter: 'https://twitter.com/revalo_agri',
    // URL du dépôt GitHub associé au projet.
    github: 'https://github.com/revalorisation-agricole',
    // URL de la page LinkedIn associée au projet.
    linkedin: 'https://linkedin.com/company/revalorisation-agricole',
  },
};

// Navigation principale du site
export const navigation = [
  // Lien vers le haut de la page d'accueil.
  { label: 'Accueil', href: '/' },
  // Lien vers la section présentant le fonctionnement de la boucle.
  { label: 'Fonctionnement', href: '#benefits' },
  // Lien vers la section contact si le composant CTA est réactivé.
  { label: 'Contact', href: '#contact' },
];
