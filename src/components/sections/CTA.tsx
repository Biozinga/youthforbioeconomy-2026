'use client';

import { useState } from 'react';

/**
 * Composant CTA (Call-To-Action) - Section de contact principal
 * Formulaire permettant aux visiteurs de demander une démonstration
 */
export function CTA() {
  // État pour stocker l'email saisi
  const [email, setEmail] = useState('');
  // État pour afficher le message de confirmation
  const [submitted, setSubmitted] = useState(false);

  /**
   * Gère la soumission du formulaire
   * @param e - Événement du formulaire
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Affiche le message de succès
    setSubmitted(true);
    // Réinitialise après 3 secondes
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section id="contact" className="cta">
      <div className="container">
        {/* Titre principal */}
        <h2>Contactez-Nous</h2>
        {/* Texte descriptif */}
        <p>Demandez une démonstration de notre capteur biologique</p>

        {/* Conteneur du formulaire et des informations */}
        <div className="cta-content">
          {/* Formulaire de contact */}
          <div className="cta-form">
            <h3>Demander une Démo</h3>
            <form onSubmit={handleSubmit}>
              {/* Champ email obligatoire */}
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* Bouton de soumission */}
              <button type="submit" className="btn btn-primary">
                {submitted ? '✓ Demande envoyée!' : 'Envoyer'}
              </button>
            </form>
            {/* Message de succès après soumission */}
            {submitted && (
              <p className="success-message">
                Merci! Nous vous contacterons bientôt.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
