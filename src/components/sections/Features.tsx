export function Features() {
  const features = [
    {
      id: 1,
      title: 'Capteur Biologique Avancé',
      description: 'Technologie brevetée détectant les marqueurs biologiques pour une analyse précise en temps réel',
      icon: '🔬',
    },
    {
      id: 2,
      title: 'Traçabilité Complète',
      description: 'Suivi du produit du fabricant au consommateur avec historique détaillé de chaque étape',
      icon: '📍',
    },
    {
      id: 3,
      title: 'Conformité Sanitaire',
      description: 'Garantit le respect des normes HACCP et réglementations alimentaires internationales',
      icon: '✓',
    },
    {
      id: 4,
      title: 'Prévention Fraude',
      description: 'Authentification de produits et détection instantanée de contrefaçons ou altérations',
      icon: '🛡️',
    },
    {
      id: 5,
      title: 'Réduction Gaspillage',
      description: 'Optimisation de la durée de vie produit et diminution du gaspillage alimentaire',
      icon: '♻️',
    },
    {
      id: 6,
      title: 'Dashboard Intégré',
      description: 'Interface intuitive pour monitorer tous les produits et générer des rapports détaillés',
      icon: '📊',
    },
  ];

  return (
    <section id="benefits" className="features">
      <div className="container">
        <h2>Avantages du Capteur BioTrack</h2>
        <p className="section-subtitle">Une solution complète pour la traçabilité intelligente</p>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
