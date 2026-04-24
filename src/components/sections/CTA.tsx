// Directive Next.js: ce composant utilise useState et doit donc être rendu côté client.
'use client';

// Import du hook useState pour gérer la saisie email et le message de confirmation.
import { useState } from 'react';

/**
 * Composant CTA (Call-To-Action) - Section de contact principal
 * Formulaire permettant aux agriculteurs et partenaires de rejoindre la boucle
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
    // Empêche le rechargement de la page lors de la soumission du formulaire.
    e.preventDefault();
    // Affiche le message de succès
    setSubmitted(true);
    // Réinitialise après 3 secondes
    setTimeout(() => {
      // Masque le message de confirmation.
      setSubmitted(false);
      // Vide le champ email pour revenir à l'état initial.
      setEmail('');
    }, 3000);
  };

  // Retourne une section d'appel à l'action avec formulaire de prise de contact.
  return (
    // Section ancrée par l'identifiant contact pour la navigation interne.
    <section id="contact" className="cta">
      {/* Conteneur central qui limite la largeur du contenu. */}
      <div className="container">
        {/* Titre principal */}
        <h2>Rejoindre la plateforme</h2>
        {/* Texte descriptif */}
        <p>
          Valorisez vos déchets céréaliers, récupérez des larves pour vos poulets et accédez à des
          engrais organiques.
        </p>

        {/* Conteneur du formulaire et des informations */}
        <div className="cta-content">
          {/* Formulaire de contact */}
          <div className="cta-form">
            <h3>Prendre contact</h3>
            {/* Le formulaire déclenche handleSubmit au lieu de recharger la page. */}
            <form onSubmit={handleSubmit}>
              {/* Champ email obligatoire */}
              <input
                // Type email pour activer la validation native du navigateur.
                type="email"
                // Texte affiché tant que le champ est vide.
                placeholder="Votre email"
                // Valeur contrôlée par l'état React email.
                value={email}
                // Met à jour l'état email à chaque frappe.
                onChange={(e) => setEmail(e.target.value)}
                // Rend le champ obligatoire avant soumission.
                required
              />
              {/* Bouton de soumission */}
              <button type="submit" className="btn btn-primary">
                {/* Le texte du bouton change après l'envoi pour confirmer l'action. */}
                {submitted ? '✓ Message envoyé!' : 'Envoyer'}
              </button>
            </form>
            {/* Message de succès après soumission */}
            {submitted && <p className="success-message">Merci! Nous vous contacterons bientôt.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
