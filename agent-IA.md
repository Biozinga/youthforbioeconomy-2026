# Agent IA - Plateforme de Revalorisation Agricole

## Vue d'ensemble

Cet agent IA assiste le développement et la maintenance du site vitrine de la **plateforme de revalorisation agricole Youth for Bioeconomy 2026**.

Le projet présente une boucle circulaire appliquée à l'agriculture céréalière :

- collecte de déchets céréaliers ;
- attribution de tokens aux agriculteurs contributeurs ;
- échange des tokens contre des larves destinées à l'alimentation des poulets ;
- transformation des déchets biologiques des poulets en engrais organiques ;
- achat d'engrais avec des tokens ;
- vente d'une petite part des larves et de l'engrais sur le marché pour générer une marge.

## Architecture du Projet

```text
src/
├── app/
│   ├── layout.tsx          # Layout racine avec métadonnées SEO
│   ├── page.tsx            # Page d'accueil principale
│   └── globals.css         # Styles globaux et responsive
├── components/
│   └── sections/
│       ├── Hero.tsx        # Section d'accueil avec animation de boucle
│       ├── Features.tsx    # Étapes et avantages de la plateforme
│       └── CTA.tsx         # Formulaire de contact réutilisable
├── lib/
│   └── config.ts           # Configuration globale du site
└── types/
    └── index.ts            # Interfaces et types TypeScript
```

## Technologies

- **Next.js 15** avec App Router
- **React 19**
- **TypeScript strict**
- **CSS global avec variables**
- **Lottie React** pour l'animation de boucle
- **next/image** pour les logos institutionnels

## Règles de Développement

1. Les commentaires de code doivent être rédigés en français.
2. Le vocabulaire produit doit rester aligné avec la revalorisation agricole.
3. Garder tous les textes centrés sur la boucle agricole, les tokens, les larves et les engrais.
4. Garder le site simple, responsive et compréhensible pour un jury de hackathon.
5. Vérifier les changements avec `npm run type-check`, `npm run lint` et `npm run format:check`.

## Contenu Produit

### Promesse

Centraliser la revalorisation des déchets de l'agriculture céréalière pour créer une boucle locale de valeur entre agriculteurs, élevages de poulets, production de larves et engrais organiques.

### Mécanisme économique

Les déchets agricoles deviennent une ressource. Les agriculteurs reçoivent des tokens, récupèrent des intrants utiles avec ces tokens, et la plateforme finance son fonctionnement grâce à une part vendue sur le marché.

### Sections du Site

- `Hero.tsx` : message principal, animation et bouton de contact.
- `Features.tsx` : cartes expliquant la boucle de valeur.
- `CTA.tsx` : formulaire de contact si la section est réactivée.
- `page.tsx` : assemblage de la page et footer institutionnel.

## Commandes Utiles

```bash
npm install
npm run dev
npm run type-check
npm run lint
npm run format:check
npm run build
```

## Maintenance

- Mettre à jour `src/lib/config.ts` si le nom, les liens ou les métadonnées changent.
- Mettre à jour `src/app/layout.tsx` pour tout changement SEO.
- Conserver les logos dans `public/images/`.
- Conserver l'animation de boucle dans `public/cycle-animation.json`.

---

Agent IA développé pour **Youth for Bioeconomy 2026**.
