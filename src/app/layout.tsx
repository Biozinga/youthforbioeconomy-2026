// Import du type Metadata fourni par Next.js pour typer les métadonnées de la page.
import type { Metadata } from 'next';
// Import du fichier de styles globaux appliqué à toute l'application.
import './globals.css';

/**
 * Métadonnées globales du site pour SEO
 * Définit le titre, la description et les tags OpenGraph
 */
export const metadata: Metadata = {
  // Titre affiché dans l'onglet du navigateur et utilisé par les moteurs de recherche.
  title: 'Revalorisation Agricole - Déchets, Larves et Engrais',
  // Description SEO courte du site.
  description:
    'Plateforme bio-circulaire territoriale qui transforme les coproduits du blé par insectes en protéines pour volailles et en fertilisants organiques.',
  // Mots-clés associés au sujet du site.
  keywords: [
    // Mot-clé lié à la transformation des déchets agricoles.
    'revalorisation agricole',
    // Mot-clé lié à la filière céréalière visée.
    'coproduits du blé',
    // Mot-clé lié au mécanisme économique de la plateforme.
    'bioconversion par insectes',
    // Mot-clé lié aux produits générés par la boucle biologique.
    'larves et engrais organiques',
  ],
  // Métadonnées utilisées lors du partage du site sur les réseaux sociaux.
  openGraph: {
    // Titre OpenGraph affiché dans les aperçus de partage.
    title: 'Revalorisation Agricole - Déchets, Larves et Engrais',
    // Description OpenGraph affichée dans les aperçus de partage.
    description:
      'Recycler, relier et relocaliser: une boucle territoriale qui convertit les coproduits végétaux en protéines avicoles et fertilisants organiques.',
    // Type de contenu OpenGraph: ici un site web.
    type: 'website',
  },
  // Indications données aux robots d'indexation.
  robots: {
    // Autorise l'indexation de la page.
    index: true,
    // Autorise les robots à suivre les liens de la page.
    follow: true,
  },
};

/**
 * Configuration du viewport pour responsive design
 */
export const viewport = {
  // Indique que la largeur logique doit suivre la largeur de l'appareil.
  width: 'device-width',
  // Définit le zoom initial à 100%.
  initialScale: 1,
  // Autorise l'utilisateur à zoomer jusqu'à 500%.
  maximumScale: 5,
};

/**
 * Layout racine de l'application
 * Enveloppe tous les contenus avec la structure HTML de base
 * @param children - Contenu des pages
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Retourne la structure HTML commune à toutes les pages de l'application.
  return (
    // Définit la langue principale du document pour l'accessibilité et le SEO.
    <html lang="fr">
      {/* En-tête technique du document HTML. */}
      <head>
        {/* Encodage UTF-8 pour les caractères spéciaux */}
        <meta charSet="utf-8" />
        {/* Configuration du viewport pour mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* Body contenant le contenu de la page */}
      {/* children représente la page active injectée par le routeur App Router de Next.js. */}
      <body>{children}</body>
    </html>
  );
}
