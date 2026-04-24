# Youth for Bioeconomy 2026

Une plateforme moderne et performante dédiée aux jeunes professionnels de la bioéconomie.

## 🌿 À Propos

Youth for Bioeconomy 2026 est un site vitrine construit avec les meilleures pratiques de développement web moderne. Il connecte les jeunes talents avec les opportunités dans le secteur de la bioéconomie durable.

### ✨ Caractéristiques

- **Performance Optimale** : Scores Lighthouse élevés, Core Web Vitals excellents
- **SEO Ready** : Structure sémantique, métadonnées optimisées
- **Responsive Design** : Adapté à tous les appareils
- **Accessible** : Conformité WCAG 2.1 AA
- **Type-Safe** : TypeScript strict mode
- **Zero Backend** : Contenu statique avec Next.js
- **Sécurité** : Headers de sécurité, CSP, X-Frame-Options

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ et npm/yarn
- Git

### Installation

```bash
# Cloner le repo
git clone https://github.com/yourusername/youthforbioeconomy-2026.git
cd youthforbioeconomy-2026

# Installer les dépendances
npm install
# ou
yarn install

# Démarrer le serveur de développement
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

## 📚 Structure du Projet

```
youthforbioeconomy-2026/
├── src/
│   ├── app/                 # Pages et layouts Next.js 13+
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Styles globaux
│   ├── components/          # Composants React
│   │   └── sections/        # Composants de sections
│   ├── lib/                 # Utilitaires et configurations
│   │   └── config.ts        # Configuration du site
│   ├── types/               # Types TypeScript
│   └── styles/              # Styles locaux
├── public/                  # Actifs statiques
│   ├── images/              # Images optimisées
│   └── icons/               # Icônes SVG
├── next.config.js          # Configuration Next.js
├── tsconfig.json           # Configuration TypeScript
├── tailwind.config.js      # Configuration Tailwind (optionnel)
├── .eslintrc.json          # Configuration ESLint
├── .prettierrc.json        # Configuration Prettier
└── package.json            # Dépendances du projet
```

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev              # Démarrer le serveur dev

# Production
npm run build            # Build pour production
npm start                # Démarrer le serveur de production

# Qualité du code
npm run lint             # Vérifier avec ESLint
npm run format           # Formater le code avec Prettier
npm run format:check     # Vérifier le formatting
npm run type-check       # Vérifier les types TypeScript
```

## 📋 Bonnes Pratiques Implémentées

### Performance

- ✅ Image Optimization avec Next.js Image
- ✅ Code Splitting automatique
- ✅ Dynamic imports pour les composants lourds
- ✅ CSS modules pour les styles scoped
- ✅ Minification automatique
- ✅ Compression Gzip/Brotli

### SEO

- ✅ Métadonnées OpenGraph
- ✅ Balises hreflang pour la localisation
- ✅ Sitemap.xml (à générer)
- ✅ robots.txt
- ✅ Métadonnées dynamiques

### Sécurité

- ✅ Content Security Policy headers
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy
- ✅ XSS Protection

### Accessibilité

- ✅ Hiérarchie de titres correcte
- ✅ Contraste de couleurs WCAG AA
- ✅ Labels implicites/explicites
- ✅ ARIA labels où nécessaire
- ✅ Keyboard navigation

### Code Quality

- ✅ TypeScript strict
- ✅ ESLint configuration
- ✅ Prettier formatting
- ✅ Pre-commit hooks (à configurer)
- ✅ Unit tests ready

## 🎨 Personnalisation

### Couleurs et Variables CSS

Modifier les variables CSS dans `src/app/globals.css` :

```css
:root {
  --color-primary: #059669;
  --color-secondary: #6366f1;
  /* ... autres variables */
}
```

### Configuration du Site

Éditer `src/lib/config.ts` pour:
- Nom du site
- URLs de réseaux sociaux
- Navigation principale
- Métadonnées

### Ajouter des Pages

1. Créer un dossier dans `src/app`
2. Ajouter `page.tsx`
3. Exporter un composant par défaut

```typescript
export default function Page() {
  return <div>Mon Contenu</div>;
}
```

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres Plateformes

- **Netlify**: Connecter le repo, sélectionner `npm run build` et `npm start`
- **GitHub Pages**: Configurer export statique dans `next.config.js`
- **Docker**: Créer un Dockerfile personnalisé

## 📊 Monitoring & Analytics

Pour ajouter Google Analytics ou autre :

1. Créer `src/lib/gtag.ts`
2. Importer dans `src/app/layout.tsx`
3. Configurer dans `next.config.js` si CSP

## 🔄 Continuous Integration

Exemple GitHub Actions (``.github/workflows/ci.yml`) :

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
```

## 📝 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour les détails.

## 🤝 Contributing

Les contributions sont bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📧 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

## 🔗 Ressources Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Web.dev - Performance](https://web.dev)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Made with ❤️ for the bioeconomy community**
