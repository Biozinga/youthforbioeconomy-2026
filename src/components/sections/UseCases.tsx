export function UseCases() {
  const usecases = [
    {
      id: 1,
      title: 'Fruits & Légumes Frais',
      description: 'Suivi du mûrissement et détection de la pourriture avant qu\'elle ne devienne visible',
      benefit: 'Réduction du gaspillage de 40%',
      color: 'bg-green',
    },
    {
      id: 2,
      title: 'Produits Laitiers',
      description: 'Détection de contamination bactérienne et contrôle de la chaîne du froid',
      benefit: 'Garantie de sécurité 99.9%',
      color: 'bg-blue',
    },
    {
      id: 3,
      title: 'Viandes & Poissons',
      description: 'Suivi de la qualité microbiologique et du maintien de la température optimale',
      benefit: 'Conformité HACCP totale',
      color: 'bg-red',
    },
    {
      id: 4,
      title: 'Produits Biologiques',
      description: 'Certification d\'authenticité et traçabilité complète du champ à l\'assiette',
      benefit: 'Protection de la marque',
      color: 'bg-orange',
    },
    {
      id: 5,\n      title: 'Boissons Premium',
      description: 'Détection de contrefaçons et suivi des conditions de stockage idéales',
      benefit: 'Prévention des fraudes',
      color: 'bg-purple',
    },
    {
      id: 6,
      title: 'Produits Pharmaceutiques',
      description: 'Conformité des conditions de stockage et d\'expédition pour les médicaments',
      benefit: 'Efficacité garantie',
      color: 'bg-indigo',
    },
  ];\n\n  return (\n    <section id="usecases" className="usecases">\n      <div className="container">\n        <h2>Cas d\'Usages Réels</h2>\n        <p className="section-subtitle">Découvrez comment BioTrack transforme différents secteurs</p>\n\n        <div className="usecases-grid">\n          {usecases.map((usecase) => (\n            <div key={usecase.id} className={`usecase-card ${usecase.color}`}>\n              <h3>{usecase.title}</h3>\n              <p>{usecase.description}</p>\n              <div className="usecase-benefit\">\n                <strong>Résultat:</strong> {usecase.benefit}\n              </div>\n            </div>\n          ))}\n        </div>\n\n        <div className="usecases-testimonial\">\n          <div className="testimonial-card\">\n            <div className="testimonial-header\">\n              <div className="testimonial-avatar\">JD</div>\n              <div className="testimonial-info\">\n                <h4>Jean Dupont</h4>\n                <p>PDG, FreshProduits SA</p>\n              </div>\n            </div>\n            <p className="testimonial-text\">\n              \"BioTrack a révolutionné notre chaîne logistique. Nous avons réduit le gaspillage de 45% et amélioré\n              la confiance des clients. C\'est un investissement essentiel pour toute entreprise alimentaire\n              moderne.\"\n            </p>\n            <div className="testimonial-rating\">⭐⭐⭐⭐⭐</div>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n}\n