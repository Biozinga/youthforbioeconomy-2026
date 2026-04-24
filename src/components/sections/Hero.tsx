'use client';

import { useState } from 'react';

export function Hero() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Révolutionnez la Traçabilité Alimentaire</h1>
          <p className="hero-subtitle">
            Capteur biologique nouvelle génération pour la surveillance en temps réel de vos produits
          </p>
          <div className="hero-features">
            <span>✓ Surveillance continu</span>
            <span>✓ Technologie biologique</span>
            <span>✓ Données en temps réel</span>
          </div>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setShowDemo(true)}>
              Demander une Démo
            </button>
            <button className="btn btn-secondary">En Savoir Plus</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="sensor-visualization">
            <div className="sensor-core"></div>
            <div className="sensor-ring ring-1"></div>
            <div className="sensor-ring ring-2"></div>
            <div className="sensor-ring ring-3"></div>
          </div>
        </div>
      </div>
      {showDemo && (
        <div className="modal-overlay" onClick={() => setShowDemo(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDemo(false)}>×</button>
            <h2>Demander une Démo</h2>
            <form className="demo-form">
              <input type="text" placeholder="Votre nom" required />
              <input type="email" placeholder="Votre email" required />
              <input type="text" placeholder="Votre entreprise" />
              <textarea placeholder="Vos questions..."></textarea>
              <button type="submit" className="btn btn-primary">Envoyer la Demande</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
