/**
 * Configuration globale du site
 * Contient les informations de base et les liens externes
 */

// Configuration principale du site
export const siteConfig = {
  // Nom du site affiché dans le titre
  name: 'TerraLoop',
  // Description courte pour SEO
  description: 'Bioconversion des coproduits du blé en protéines avicoles et fertilisants',
  // URL de base du site
  url: 'https://terraloop.bio',
  // Image pour les réseaux sociaux
  ogImage: 'https://terraloop.bio/og-image.png',
  // Liens vers les réseaux sociaux
  links: {
    // URL du compte Twitter/X associé au projet.
    twitter: 'https://twitter.com/terraloop',
    // URL du dépôt GitHub associé au projet.
    github: 'https://github.com/Biozinga/youthforbioeconomy-2026',
    // URL de la page LinkedIn associée au projet.
    linkedin: 'https://linkedin.com/company/terraloop',
  },
};

// Navigation principale du site
export const navigation = [
  // Lien vers le haut de la page d'accueil.
  { label: 'Accueil', href: '#top' },
  // Lien vers la section présentant le fonctionnement de la boucle.
  { label: 'Fonctionnement', href: '#benefits' },
  // Lien vers la section expliquant la conversion biologique des déchets.
  { label: 'Conversion', href: '#conversion' },
  // Lien vers la section finale de simulation.
  { label: 'Simulation', href: '#simulation' },
];
