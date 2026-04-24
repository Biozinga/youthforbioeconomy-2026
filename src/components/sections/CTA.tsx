'use client';

import { useState } from 'react';

export function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section id="contact" className="cta">
      <div className="container">
        <h2>Transformez Votre Chaîne d'Approvisionnement</h2>
        <p>
          Rejoignez les leaders alimentaires qui font confiance à BioTrack pour la traçabilité intelligente
        </p>

        <div className="cta-content">
          <div className="cta-form">
            <h3>Demander une Démo Gratuite</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                {submitted ? '✓ Demande envoyée!' : 'Accéder à la Démo'}
              </button>
            </form>
            {submitted && (
              <p className="success-message">Merci! Nous vous contacterons bientôt.</p>
            )}
          </div>

          <div className="cta-stats">
            <div className="stat">
              <div className="stat-value">500+</div>
              <div className="stat-label">Entreprises</div>
            </div>
            <div className="stat">
              <div className="stat-value">2M+</div>
              <div className="stat-label">Produits Tracés</div>
            </div>
            <div className="stat">
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Précision</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
