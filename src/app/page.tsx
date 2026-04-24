/**
 * Page d'accueil principale - Vitrine du capteur biologique
 * Regroupe les sections Hero, Features et CTA pour une présentation complète
 */

import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { CTA } from '@/components/sections/CTA';

/**
 * Composant racine de la page d'accueil
 * @returns JSX de la page complète
 */
export default function Home() {
  return (
    <main>
      {/* Section d'accueil avec visualisation du capteur */}
      <Hero />
      
      {/* Section des avantages du capteur */}
      <Features />
      
      {/* Section d'appel à l'action et formulaire de contact */}
      <CTA />
    </main>
  );
}
