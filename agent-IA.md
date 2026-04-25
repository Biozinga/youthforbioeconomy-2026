# Agent IA - TerraLoop

## Vue d'ensemble

Cet agent IA assiste le développement et la maintenance du site vitrine de **TerraLoop**, plateforme de revalorisation agricole Youth for Bioeconomy 2026.

Le projet présente une boucle bio-circulaire appliquée à l'agriculture céréalière :

- collecte de coproduits du blé : paille, sons, issues de nettoyage ;
- préparation de la biomasse végétale : broyage, humidification, fermentation légère ;
- bioconversion par insectes dans une unité contrôlée ;
- intégration de protéines d'insectes dans l'alimentation avicole locale ;
- traitement des fientes en amendement organique sécurisé ;
- retour de matière organique et d'azote aux sols céréaliers.

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
3. Mettre l'accent sur le vivant comme moteur d'ingénierie, la bioconversion, les larves, les volailles et la fertilité des sols.
4. Garder le site simple, responsive et compréhensible pour un jury de hackathon.
5. Vérifier les changements avec `npm run type-check`, `npm run lint` et `npm run format:check`.

## Contenu Produit

### Promesse

Recycler, relier et relocaliser : transformer les coproduits du blé en protéines pour volailles, puis restituer les nutriments aux sols sous forme d'amendement organique.

### Mécanisme économique

Le modèle repose sur les coûts évités, soja importé, engrais chimiques, évacuation de déchets, et sur de nouveaux revenus locaux : volailles, œufs, fertilisants organiques et éventuels excédents de farine d'insectes.

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
