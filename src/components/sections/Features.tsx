/**
 * Composant Features - Section des avantages clés du capteur
 * Affiche 3 avantages principaux en cartes animées
 */
export function Features() {
  // Définition des avantages du capteur biologique
  const features = [
    {
      id: 1,
      title: 'Surveillance en Temps Réel',
      description: 'Données actualisées chaque minute pour un suivi continu',
      icon: '📡',
    },
    {
      id: 2,
      title: 'Technologie Biologique',
      description: 'Détection précise via biomarqueurs innovants',
      icon: '🔬',
    },
    {
      id: 3,
      title: 'Traçabilité Complète',
      description: 'Historique détaillé de chaque produit du début à la fin',
      icon: '✓',
    },
  ];

  return (
    <section id="benefits" className="features">
      <div className="container">
        {/* Titre de la section */}
        <h2>Avantages du Capteur</h2>
        {/* Sous-titre descriptif */}
        <p className="section-subtitle">Solution complète de traçabilité</p>

        {/* Conteneur en grille pour afficher les avantages */}
        <div className="features-grid">
          {/* Itération sur chaque avantage */}
          {features.map((feature) => (
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
