/**
 * Page d'accueil principale - Vitrine du projet de détection ZEN
 * Regroupe les sections Hero et Features pour une présentation complète
 */

// Import du composant Image de Next.js pour optimiser automatiquement le logo du footer.
import Image from 'next/image';
// Import du header simple affiché en haut de page.
import { Header } from '@/components/sections/Header';
// Import du composant invisible qui anime les titres au scroll.
import { ScrollReveal } from '@/components/ScrollReveal';
// Import de la section d'accueil, qui contient le titre principal et l'animation de la boucle.
import { Hero } from '@/components/sections/Hero';
// Import de la section listant les étapes principales de la plateforme.
import { Features } from '@/components/sections/Features';
// Import de la section expliquant le signal fluorescent ZEN.
import { BioConversion } from '@/components/sections/BioConversion';
// Import de la section présentant les modules scientifiques clés.
import { Molecules } from '@/components/sections/Molecules';

/**
 * Composant racine de la page d'accueil
 * @returns JSX de la page complète
 */
export default function Home() {
  // Retourne un fragment React pour pouvoir afficher le contenu principal et le footer côte à côte.
  return (
    // Fragment React invisible dans le DOM, utilisé car le composant renvoie plusieurs blocs voisins.
    <>
      {/* Header simple avec le nom du projet et la navigation principale */}
      <Header />
      {/* Animation douce des titres et sous-titres au scroll */}
      <ScrollReveal />

      {/* Zone principale de la page, réservée au contenu éditorial et fonctionnel. */}
      <main>
        {/* Section d'accueil avec vidéo et promesse de détection */}
        <Hero />

        {/* Section des avantages et étapes de la plateforme */}
        <Features />

        {/* Section de fond expliquant le mécanisme de détection */}
        <BioConversion />

        {/* Section présentant docking, SMD et validation expérimentale */}
        <Molecules />
      </main>

      {/* Pied de page institutionnel affiché sous le contenu principal. */}
      <footer className="site-footer">
        {/* Conteneur centré qui aligne le texte à gauche et les logos à droite sur grand écran. */}
        <div className="container site-footer-content">
          {/* Mention du contexte de présentation du projet. */}
          <p>
            Projet présenté dans le cadre du{' '}
            <a
              href="https://www.universite-paris-saclay.fr/evenements/hackathon-youthforbioeconomy-2026"
              target="_blank"
              rel="noreferrer"
            >
              HACKATHON #YOUTHFORBIOECONOMY 2026
            </a>
          </p>
          {/* Groupe des logos partenaires stockés dans le dossier public/images. */}
          <div className="site-footer-logos">
            {/* Logo cliquable de l'Université Paris-Saclay. */}
            <a href="https://www.universite-paris-saclay.fr" target="_blank" rel="noreferrer">
              <Image
                // Chemin public du logo, servi directement depuis le dossier public de Next.js.
                src="/images/Logo_Université_Paris-Saclay_2019-12.svg.png"
                // Texte alternatif lu par les lecteurs d'écran et affiché si l'image ne charge pas.
                alt="Université Paris-Saclay"
                // Largeur réelle du fichier source, utilisée par Next.js pour calculer le ratio d'image.
                width={1280}
                // Hauteur réelle du fichier source, utilisée avec la largeur pour préserver les proportions.
                height={450}
                // Classe CSS qui contrôle la taille visuelle du logo dans le footer.
                className="site-footer-logo site-footer-logo-saclay"
              />
            </a>
            {/* Logo cliquable AgroParisTech. */}
            <a href="https://www.agroparistech.fr" target="_blank" rel="noreferrer">
              <Image
                // Chemin public du logo AgroParisTech, servi depuis le dossier public de Next.js.
                src="/images/APT_Logo_RVB_Positif.png"
                // Texte alternatif lu par les lecteurs d'écran et affiché si l'image ne charge pas.
                alt="AgroParisTech"
                // Largeur réelle du fichier source, utilisée par Next.js pour calculer le ratio d'image.
                width={1280}
                // Hauteur réelle du fichier source, utilisée avec la largeur pour préserver les proportions.
                height={355}
                // Classe CSS qui contrôle la taille visuelle du logo dans le footer.
                className="site-footer-logo site-footer-logo-apt"
              />
            </a>
            {/* Logo cliquable AGPB. */}
            <a href="https://agpb.fr" target="_blank" rel="noreferrer">
              <Image
                // Chemin public du logo AGPB, servi depuis le dossier public de Next.js.
                src="/images/logo_agpb.png"
                // Texte alternatif lu par les lecteurs d'écran et affiché si l'image ne charge pas.
                alt="AGPB"
                // Largeur réelle du fichier source, utilisée par Next.js pour calculer le ratio d'image.
                width={175}
                // Hauteur réelle du fichier source, utilisée avec la largeur pour préserver les proportions.
                height={171}
                // Classe CSS qui contrôle la taille visuelle du logo dans le footer.
                className="site-footer-logo site-footer-logo-agpb"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
