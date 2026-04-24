export function Features() {
  const features = [
    {
      id: 1,
      title: 'Réseau Global',
      description: 'Connectez-vous avec des jeunes professionnels du monde entier',
    },
    {
      id: 2,
      title: 'Formation',
      description: 'Accédez à des ressources et formations en bioéconomie',
    },
    {
      id: 3,
      title: 'Opportunités',
      description: 'Découvrez des offres de stages et d\'emploi',
    },
  ];

  return (
    <section className="features">
      <div className="container">
        <h2>Nos Services</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
