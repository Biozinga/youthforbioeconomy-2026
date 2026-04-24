# Plateforme de Revalorisation Agricole

**Site vitrine Next.js pour une plateforme circulaire qui transforme les déchets de l'agriculture céréalière en tokens, larves pour poulets et engrais organiques.**

Le projet a été présenté dans le cadre du hackathon **HACKATHON #YOUTHFORBIOECONOMY 2026**.

## Concept

La plateforme centralise la collecte et la valorisation des déchets agricoles issus de la filière céréalière.

Le fonctionnement est simple :

- les agriculteurs confient leurs déchets céréaliers à la plateforme ;
- chaque apport génère des tokens ;
- les tokens peuvent être utilisés pour récupérer des larves destinées à l'alimentation des poulets ;
- les déchets biologiques des poulets sont transformés en engrais organiques ;
- les engrais peuvent aussi être achetés avec les tokens ;
- une petite part des larves et de l'engrais est conservée puis vendue sur le marché pour financer le modèle.

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

Explique les cinq étapes du modèle :

- déchets agricoles valorisés ;
- récompense en tokens ;
- larves pour les poulets ;
- engrais organiques ;
- marge circulaire via vente d'une petite part de production.

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
