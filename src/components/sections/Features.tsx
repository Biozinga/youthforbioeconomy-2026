/**
 * Composant Features - Section des avantages clés de la plateforme
 * Affiche les étapes principales de revalorisation agricole en cartes
 */
export function Features() {
  // Définition des étapes et avantages de la boucle de revalorisation.
  const features = [
    // Premier avantage affiché dans la grille.
    {
      // Identifiant unique utilisé comme clé React.
      id: 1,
      // Titre visible de la carte.
      title: 'Déchets agricoles valorisés',
      // Phrase descriptive affichée sous le titre.
      description:
        'Les agriculteurs confient leurs déchets céréaliers à la plateforme au lieu de les perdre.',
      // Icône visuelle associée à l'avantage.
      icon: '🌾',
    },
    // Deuxième avantage affiché dans la grille.
    {
      // Identifiant unique utilisé comme clé React.
      id: 2,
      // Titre visible de la carte.
      title: 'Récompense en tokens',
      // Phrase descriptive affichée sous le titre.
      description:
        'Chaque apport de matière organique génère des tokens utilisables dans notre écosystème.',
      // Icône visuelle associée à l'avantage.
      icon: '🪙',
    },
    // Troisième avantage affiché dans la grille.
    {
      // Identifiant unique utilisé comme clé React.
      id: 3,
      // Titre visible de la carte.
      title: 'Larves pour les poulets',
      // Phrase descriptive affichée sous le titre.
      description:
        'Les tokens permettent de récupérer des larves riches en protéines pour nourrir les poulets.',
      // Icône visuelle associée à l'avantage.
      icon: '🐛',
    },
    // Quatrième avantage affiché dans la grille.
    {
      // Identifiant unique utilisé comme clé React.
      id: 4,
      // Titre visible de la carte.
      title: 'Engrais organiques',
      // Phrase descriptive affichée sous le titre.
      description:
        'Les déchets biologiques des poulets sont transformés en engrais achetables avec les tokens.',
      // Icône visuelle associée à l'avantage.
      icon: '🌱',
    },
    // Cinquième avantage affiché dans la grille.
    {
      // Identifiant unique utilisé comme clé React.
      id: 5,
      // Titre visible de la carte.
      title: 'Marge circulaire',
      // Phrase descriptive affichée sous le titre.
      description:
        "Une petite part des larves et de l'engrais est vendue sur le marché mondial pour financer le modèle.",
      // Icône visuelle associée à l'avantage.
      icon: '📈',
    },
  ];

  // Retourne la section présentant les avantages sous forme de cartes.
  return (
    // Section ancrée par l'identifiant benefits pour la navigation interne.
    <section id="benefits" className="features">
      {/* Conteneur central qui limite la largeur du contenu. */}
      <div className="container">
        {/* Titre de la section */}
        <h2>Une boucle agricole complète</h2>
        {/* Sous-titre descriptif */}
        <p className="section-subtitle">
          Des déchets céréaliers aux protéines animales, puis aux engrais organiques.
        </p>

        {/* Conteneur en grille pour afficher les avantages */}
        <div className="features-grid">
          {/* Itération sur chaque avantage */}
          {features.map((feature) => (
            // Carte individuelle; key permet à React d'identifier chaque élément.
            <div key={feature.id} className="feature-card">
              {/* Icône représentant l'avantage */}
              <div className="feature-icon">{feature.icon}</div>
              {/* Titre du feature */}
              <h3>{feature.title}</h3>
              {/* Description du feature */}
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
