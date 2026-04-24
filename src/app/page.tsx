import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Technology } from '@/components/sections/Technology';
import { UseCases } from '@/components/sections/UseCases';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Technology />
      <UseCases />
      <CTA />
    </main>
  );
}
