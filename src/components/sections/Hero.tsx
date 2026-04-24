'use client';

import { useState } from 'react';
import Lottie from 'lottie-react';
import sensorAnimation from '../../../public/sensor-animation.json';

/**
 * Composant Hero - Section d'accueil principale avec présentation du capteur
 * Affiche une visualisation Lottie du capteur biologique avec animation
 */
export function Hero() {
  // État pour contrôler l'affichage du formulaire de démonstration
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="hero">
      <div className="container hero-content">
        {/* Contenu texte de la section accueil */}
        <div className="hero-text">
          <h1>Capteur Biologique de Suivi</h1>
          <p className="hero-subtitle">
            Surveillance en temps réel de vos produits alimentaires
          </p>

          {/* Boutons d'action */}
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setShowDemo(true)}>
              Demander une Démo
            </button>
          </div>
        </div>

        {/* Animation Lottie du capteur */}
        <div className="hero-image">
          <div className="sensor-visualization">
            <Lottie
              animationData={sensorAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '300px', height: '300px' }}
            />
          </div>
        </div>
      </div>

      {/* Modal pour la demande de démonstration */}
      {showDemo && (
        <div className="modal-overlay" onClick={() => setShowDemo(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Bouton de fermeture */}
            <button className="modal-close" onClick={() => setShowDemo(false)}>
              ×
            </button>

            {/* Titre du formulaire */}
            <h2>Demander une Démonstration</h2>

            {/* Animation Lottie dans le modal */}
            <div className="demo-animation">
              <Lottie
                animationData={sensorAnimation}
                loop={true}
                autoplay={true}
                style={{ width: '150px', height: '150px', margin: '0 auto 20px' }}
              />
            </div>

            {/* Formulaire de contact */}
            <form className="demo-form">
              <input type="text" placeholder="Votre nom" required />
              <input type="email" placeholder="Votre email" required />
              <input type="text" placeholder="Votre entreprise" />
              <textarea placeholder="Votre message..."></textarea>
              <button type="submit" className="btn btn-primary">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
