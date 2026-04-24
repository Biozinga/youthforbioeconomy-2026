# Agent IA - Capteur Biologique de Suivi

## Vue d'ensemble

Cet agent IA est conçu pour assister dans le développement et la maintenance du site vitrine du **Capteur Biologique de Suivi**, une solution innovante de traçabilité en temps réel pour produits alimentaires utilisant des capteurs biologiques nouvelle génération.

## Fonctionnalités principales

### 1. Développement Frontend
- **Framework**: Next.js 15 avec App Router
- **Langage**: TypeScript strict
- **Styling**: CSS Variables avec design system responsive
- **Animations**: Intégration Lottie pour visualisations interactives

### 2. Architecture du projet
```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout racine avec métadonnées SEO
│   ├── page.tsx           # Page d'accueil principale
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   └── sections/          # Sections de la page d'accueil
│       ├── Hero.tsx       # Section d'accueil avec animation Lottie
│       ├── Features.tsx   # Avantages du capteur
│       └── CTA.tsx        # Appel à l'action avec formulaire
├── lib/                   # Utilitaires et configurations
│   └── config.ts          # Configuration globale du site
└── types/                 # Définitions TypeScript
    └── index.ts           # Interfaces et types
```

### 3. Technologies utilisées
- **Next.js 15**: Framework React avec App Router
- **TypeScript**: Typage strict pour la sécurité
- **React 19**: Composants fonctionnels avec hooks
- **Lottie React**: Animations vectorielles interactives
- **CSS Variables**: Design system maintenable

## Instructions de développement

### Bonnes pratiques
1. **Commentaires**: Tout le code doit être commenté en français
2. **Typage**: Utiliser TypeScript strict pour tous les composants
3. **Responsive**: Design mobile-first avec breakpoints adaptés
4. **Performance**: Optimisation des images et lazy loading
5. **SEO**: Métadonnées optimisées pour les moteurs de recherche

### Structure des composants
Chaque composant doit suivre cette structure :
```typescript
/**
 * Description du composant en français
 * Fonctionnalités et responsabilités
 */
export function ComponentName() {
  // États et hooks
  // Logique métier
  // Rendu JSX avec commentaires
}
```

### Gestion des styles
- Utiliser les variables CSS définies dans `globals.css`
- Classes sémantiques et maintenables
- Animations fluides avec CSS transitions
- Design responsive avec media queries

## Déploiement et maintenance

### Build et déploiement
```bash
# Installation des dépendances
npm install

# Développement local
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start
```

### Optimisations
- **Images**: Utiliser Next.js Image component pour l'optimisation
- **Bundle**: Code splitting automatique avec Next.js
- **SEO**: Métadonnées dynamiques et structured data
- **Performance**: Core Web Vitals optimisés

## Fonctionnalités du capteur

### Surveillance en temps réel
- Données actualisées chaque minute
- Transmission sécurisée des informations
- Interface utilisateur intuitive

### Technologie biologique
- Détection via biomarqueurs innovants
- Précision élevée des mesures
- Compatibilité multi-produits

### Traçabilité complète
- Historique détaillé du produit
- De la production à la consommation
- Conformité réglementaire

## Support et évolution

### Maintenance
- Mise à jour régulière des dépendances
- Monitoring des performances
- Tests automatisés (à implémenter)

### Évolutions futures
- Dashboard d'administration
- API REST pour intégrations
- Application mobile compagnon
- Intelligence artificielle prédictive

---

*Agent IA développé pour Youth for Bioeconomy 2026 - Solution de traçabilité alimentaire innovante*
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── sections/                 # Sections de pages
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── CTA.tsx
│   ├── ui/                       # Composants réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Navigation.tsx
│   └── common/                   # Composants communs
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                          # Utilitaires
│   ├── config.ts                 # Configuration globale
│   ├── utils.ts                  # Utilitaires génériques
│   └── seo.ts                    # Utilitaires SEO
├── types/                        # Types TypeScript
│   ├── index.ts
│   └── api.ts
├── styles/                       # Styles globaux
│   └── globals.css
└── public/                       # Assets statiques
    ├── images/
    ├── icons/
    └── fonts/
```

### 4. Patterns Recommandés

#### Server Components (par défaut)

```typescript
// ✅ Préféré
export default async function Page() {
  const data = await fetch(...);
  return <div>{/* Rendu côté serveur */}</div>;
}
```

#### Client Components (quand nécessaire)

```typescript
'use client';

import { useState } from 'react';

export default function InteractiveComponent() {
  const [state, setState] = useState('');
  return <div>Interactive content</div>;
}
```

#### Optimisation d'Images

```typescript
import Image from 'next/image';

export default function HeroImage() {
  return (
    <Image
      src="/images/hero.webp"
      alt="Description descriptive"
      width={1200}
      height={600}
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
    />
  );
}
```

#### Métadonnées Dynamiques

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth for Bioeconomy 2026',
  description: 'Description concise et SEO-optimisée',
  openGraph: {
    title: 'Youth for Bioeconomy 2026',
    description: '...',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  alternates: {
    canonical: 'https://youthforbioeconomy.com',
  },
};

export default function Page() {
  return <div></div>;
}
```

### 5. Checklist de Performance

Avant de finaliser toute page :

- ✅ Lighthouse score > 90
- ✅ Cumulative Layout Shift < 0.1
- ✅ First Input Delay < 100ms
- ✅ Largest Contentful Paint < 2.5s
- ✅ Images optimisées (WebP, sizes correctes)
- ✅ CSS non-critique déféré
- ✅ Pas de render-blocking resources
- ✅ Minification activée

### 6. Checklist d'Accessibilité

- ✅ Hiérarchie de titres correcte (un seul h1)
- ✅ Contraste WCAG AA minimum (4.5:1 pour le texte)
- ✅ Labels explicites pour tous les inputs
- ✅ ARIA roles quand nécessaire
- ✅ Clavier navigable
- ✅ Alt text significatif pour toutes les images
- ✅ Focus visible (outline)
- ✅ Pas de contenu basé uniquement sur la couleur

### 7. Checklist de Sécurité

- ✅ CSP headers configurés
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ HTTPS obligatoire (en production)
- ✅ Pas de secrets en code source
- ✅ Input validation
- ✅ XSS protection (React échappe par défaut)

## 🔧 Tâches Courantes

### Ajouter une Page

```bash
# Structure
src/app/page-name/
├── page.tsx           # Le contenu
├── layout.tsx         # Layout personnalisé (optionnel)
└── error.tsx          # Error boundary (optionnel)
```

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Youth for Bioeconomy',
  description: 'Page description for SEO',
};

export default function PageName() {
  return <main>{/* Content */}</main>;
}
```

### Ajouter un Composant

```typescript
// src/components/ui/Button.tsx
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      aria-busy={disabled}
    >
      {children}
    </button>
  );
}
```

### Ajouter une Route API (si nécessaire)

```typescript
// src/app/api/route-name/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Traiter les données
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

## 🚀 Workflows Recommandés

### Développement Itératif

1. **Planification** : Définir structure et composants
2. **Implémentation** : Coder avec TypeScript strict
3. **Testing** : Vérifier les scores Lighthouse
4. **Accessibilité** : Tester avec keyboard + lecteur d'écran
5. **Documentation** : Commenter le code complexe

### Review Checklist

- [ ] TypeScript strict mode pass
- [ ] Lighthouse score > 90
- [ ] No ESLint warnings
- [ ] Prettier format applied
- [ ] Accessibility tested
- [ ] Mobile responsive
- [ ] SEO metadata present
- [ ] Error boundaries added
- [ ] Loading states handled
- [ ] Documentation updated

## 📊 Métriques à Suivre

```javascript
// Core Web Vitals cibles
CLS: < 0.1          // Cumulative Layout Shift
FID: < 100ms        // First Input Delay (deprecated, utiliser INP)
INP: < 200ms        // Interaction to Next Paint
LCP: < 2.5s         // Largest Contentful Paint
TTFB: < 600ms       // Time to First Byte
FCP: < 1.8s         // First Contentful Paint
```

## 🔗 Ressources de Référence

- [Next.js Official Docs](https://nextjs.org/docs)
- [Web.dev Best Practices](https://web.dev)
- [WCAG 2.1 Accessibility](https://www.w3.org/WAI/WCAG21/quickref)
- [OWASP Security](https://owasp.org)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🎯 Vision du Projet

Youth for Bioeconomy 2026 doit être :

- **Performant** : Scores Lighthouse 90+ partout
- **Sûr** : Headers de sécurité, validation, HTTPS
- **Accessible** : WCAG 2.1 AA, keyboard navigable
- **SEO-Optimisé** : Métadonnées, schemas structurés
- **Maintenable** : Code propre, typé, documenté
- **Scalable** : Architecture modulaire et extensible

---

**Ce document doit être consulté lors du développement de nouvelles features ou pages.**
