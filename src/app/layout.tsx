import type { Metadata } from 'next';
import './globals.css';

/**
 * Métadonnées globales du site pour SEO
 * Définit le titre, la description et les tags OpenGraph
 */
export const metadata: Metadata = {
  title: 'Capteur Biologique - Traçabilité Alimentaire',
  description: 'Solution de traçabilité en temps réel pour produits alimentaires avec capteur biologique nouvelle génération',
  keywords: [
    'capteur biologique',
    'traçabilité alimentaire',
    'surveillance qualité',
    'technologie innovation',
  ],
  openGraph: {
    title: 'Capteur Biologique - Traçabilité Alimentaire',
    description: 'Solution innovante de traçabilité en temps réel pour produits alimentaires',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Configuration du viewport pour responsive design
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Layout racine de l'application
 * Enveloppe tous les contenus avec la structure HTML de base
 * @param children - Contenu des pages
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Encodage UTF-8 pour les caractères spéciaux */}
        <meta charSet="utf-8" />
        {/* Configuration du viewport pour mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* Body contenant le contenu de la page */}
      <body>{children}</body>
    </html>
  );
}
