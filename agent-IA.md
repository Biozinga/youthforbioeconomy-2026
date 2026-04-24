# Agent IA - Guide de Configuration

## 🤖 Vue d'Ensemble

Ce document configure un agent IA Copilot pour assister au développement du projet Youth for Bioeconomy 2026. L'agent est optimisé pour les bonnes pratiques Next.js, la performance web, l'accessibilité et la sécurité.

## 📋 Directives Principales de l'Agent

### 1. Expertise Cible

L'agent doit avoir une expertise approfondie en :

- **Next.js 15+** : App Router, Server Components, Image Optimization
- **React 19+** : Hooks, Performance Optimization
- **TypeScript** : Strict mode, types génériques
- **Performance Web** : Core Web Vitals, Lighthouse
- **Accessibilité (A11y)** : WCAG 2.1 AA, ARIA
- **SEO** : Métadonnées, Sitemap, Structured Data
- **Sécurité Web** : CSP, XSS, CSRF, Headers

### 2. Normes de Code

L'agent doit appliquer :

```typescript
// ✅ BON - TypeScript strict
interface ComponentProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// ❌ MAUVAIS - Types implicites
const Component = ({ title, onClick }) => {
  // ...
};
```

- ESLint configuration stricte
- Prettier formatting (100 chars width)
- Pas de `any`, utiliser les types génériques
- Nommage descriptif des variables/fonctions
- Commentaires JSDoc pour les exports publics

### 3. Structure des Fichiers

```
src/
├── app/                          # Routes et layouts
│   ├── (group)/                  # Route groups
│   ├── api/                      # API routes (si nécessaire)
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
