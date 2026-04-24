import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BioTrack | Capteur Biologique Intelligent pour la Traçabilité Alimentaire',
  description:
    'Solution révolutionnaire de traçabilité en temps réel pour produits alimentaires. Capteur biologique nouvelle génération, surveillance continue, garantie de qualité.',
  keywords: [
    'capteur biologique',
    'traçabilité alimentaire',
    'surveillance qualité',
    'technologie innovation',
    'produits frais',
    'IoT',
    'bioéconomie',
  ],
  openGraph: {
    title: 'BioTrack | Capteur Biologique pour la Traçabilité',
    description:
      'Solution innovante de traçabilité en temps réel pour produits alimentaires avec capteur biologique nouvelle génération',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
