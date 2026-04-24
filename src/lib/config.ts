/**
 * Configuration globale du site
 * Contient les informations de base et les liens externes
 */

// Configuration principale du site
export const siteConfig = {
  // Nom du site affiché dans le titre
  name: 'Capteur Biologique de Suivi',
  // Description courte pour SEO
  description: 'Solution de traçabilité en temps réel pour produits alimentaires',
  // URL de base du site
  url: 'https://capteur-biologique.com',
  // Image pour les réseaux sociaux
  ogImage: 'https://capteur-biologique.com/og-image.png',
  // Liens vers les réseaux sociaux
  links: {
    twitter: 'https://twitter.com/capteur_bio',
    github: 'https://github.com/biotrack',
    linkedin: 'https://linkedin.com/company/capteur-bio',
  },
};

// Navigation principale du site
export const navigation = [
  { label: 'Accueil', href: '/' },
  { label: 'Technologie', href: '#technology' },
  { label: 'Avantages', href: '#benefits' },
  { label: 'Contact', href: '#contact' },
];
