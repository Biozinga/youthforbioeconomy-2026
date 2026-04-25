# TerraLoop

**Site vitrine Next.js pour TerraLoop, une plateforme bio-circulaire territoriale qui transforme les coproduits du blé en protéines pour volailles et en fertilisants organiques.**

Le projet a été présenté dans le cadre du hackathon **HACKATHON #YOUTHFORBIOECONOMY 2026**.

## Concept

La plateforme centralise la collecte et la valorisation des coproduits végétaux issus de la filière céréalière, notamment paille, sons et issues de nettoyage du blé.

L'idée centrale est simple : **recycler, relier et relocaliser**. Les flux végétaux sous-exploités sont préparés puis transformés par bioconversion avec des insectes. Le vivant devient un moteur d'ingénierie capable de convertir une biomasse difficilement valorisable en protéines, lipides et fertilisants utiles localement.

Le fonctionnement est simple :

- les agriculteurs confient leurs coproduits céréaliers à la plateforme ;
- chaque apport est acheté en argent classique, selon la quantité et la qualité de la biomasse ;
- la biomasse est préparée puis convertie par des larves en protéines et lipides ;
- ces ingrédients peuvent remplacer une partie du soja importé dans l'alimentation avicole ;
- les fientes et litières sont traitées en amendement organique sécurisé ;
- la valeur économique reste davantage sur le territoire.

## Fonctionnalités du site

- Section d'accueil présentant la promesse de la plateforme.
- Animation Lottie illustrant la boucle de revalorisation.
- Cartes explicatives sur les étapes du modèle circulaire.
- Footer avec les logos de l'Université Paris-Saclay et de l'AGPB.
- Métadonnées SEO alignées avec le positionnement agricole.
- Design responsive pour desktop et mobile.

## Stack Technique

- **Next.js 15** avec App Router
- **React 19**
- **TypeScript**
- **CSS global avec variables**
- **Lottie React**
- **next/image** pour les logos

## Démarrage Rapide

### Prérequis

- Node.js 18+
- npm
- Git

### Installation

```bash
git clone https://github.com/Biozinga/youthforbioeconomy-2026.git
cd youthforbioeconomy-2026
npm install
npm run dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000), ou sur le port indiqué par Next.js si `3000` est déjà utilisé.

## Scripts

```bash
npm run dev            # Démarre le serveur de développement
npm run build          # Génère le build de production
npm run start          # Lance le serveur de production
npm run lint           # Vérifie le code avec ESLint
npm run type-check     # Vérifie les types TypeScript
npm run format         # Formate le code avec Prettier
npm run format:check   # Vérifie le formatage Prettier
```

## Structure

```text
youthforbioeconomy-2026/
├── public/
│   ├── cycle-animation.json
│   └── images/
│       ├── Logo_Université_Paris-Saclay_2019-12.svg.png
│       └── logo_agpb.png
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── sections/
│   │       ├── CTA.tsx
│   │       ├── Features.tsx
│   │       └── Hero.tsx
│   ├── lib/
│   │   └── config.ts
│   └── types/
│       └── index.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## Sections Principales

### Hero

Présente la plateforme comme une boucle agricole qui transforme les déchets céréaliers en ressources utiles.

### Features

Explique la boucle territoriale :

- coproduits du blé préparés ;
- bioconversion par insectes ;
- alimentation avicole locale ;
- traitement des fientes ;
- retour de matière organique aux sols.

### Footer

Affiche la mention du hackathon et les logos partenaires.

## Déploiement

Le projet peut être déployé sur Vercel, Netlify ou toute plateforme compatible Next.js.

```bash
npm run build
```

Note technique : avec Next.js 15, la configuration actuelle affiche encore des avertissements sur `i18n` et `swcMinify` dans `next.config.js`. Le build reste fonctionnel.

## Licence

MIT License.

---

Projet développé pour **Youth for Bioeconomy 2026**.
