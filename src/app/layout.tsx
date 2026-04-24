import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Youth for Bioeconomy 2026',
  description:
    'Une plateforme dédiée aux jeunes engagés pour une bioéconomie durable et innovante.',
  keywords: ['bioeconomy', 'youth', 'sustainability', 'innovation'],
  openGraph: {
    title: 'Youth for Bioeconomy 2026',
    description:
      'Une plateforme dédiée aux jeunes engagés pour une bioéconomie durable et innovante.',
    type: 'website',
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
