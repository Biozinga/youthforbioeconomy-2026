// Directive Next.js: cette section ouvre une pop-up et doit être rendue côté client.
'use client';

// Import du type FormEvent pour typer la validation du formulaire.
import type { FormEvent } from 'react';
// Import des hooks React pour contrôler la pop-up et animer le montant.
import { useEffect, useState } from 'react';
// Import du composant Lottie pour afficher l'animation de ferme connectée.
import Lottie from 'lottie-react';
// Import de l'animation de ferme connectée avec drone.
import droneFarmAnimation from '../../../lottiefiles/IoT digital farming with drone.json';

// Types de cultures proposés dans le simulateur temporaire.
type CropType = 'ble' | 'mais';

// Étapes possibles dans la pop-up de simulation.
type SimulationStep = 'choice' | 'cereal-form' | 'cereal-result';

// Structure du résultat temporaire affiché à l'utilisateur.
type SimulationResult = {
  amount: number;
  residueTons: number;
  pricePerTon: number;
  marketRevenueEuros: number;
  bonusEuros: number;
  bonusPct: number;
  residuePerHa: number;
};

// Formateur euro centralisé pour afficher les montants de façon lisible.
const euroFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

// Libellés visibles associés aux valeurs techniques du formulaire.
const cropLabels: Record<CropType, string> = {
  ble: 'Blé',
  mais: 'Maïs',
};

/**
 * Composant Simulation - Dernière section de la page
 * Propose une entrée de simulation pour revendre des déchets agricoles ou avicoles
 */
export function Simulation() {
  // État qui indique si la pop-up de choix de simulation est ouverte.
  const [isOpen, setIsOpen] = useState(false);
  // Étape active dans la pop-up: choix initial, formulaire céréales ou résultat.
  const [step, setStep] = useState<SimulationStep>('choice');
  // Culture sélectionnée par défaut pour éviter un formulaire vide.
  const [cropType, setCropType] = useState<CropType>('ble');
  // Surface saisie sous forme de chaîne pour garder le contrôle du champ input.
  const [hectares, setHectares] = useState('25');
  // Résultat temporaire calculé après validation du formulaire.
  const [result, setResult] = useState<SimulationResult | null>(null);
  // Montant affiché progressivement pour créer un effet compteur jusqu'à la vraie valeur.
  const [animatedAmount, setAnimatedAmount] = useState(0);
  // État de chargement pendant l'appel au calcul serveur.
  const [isCalculating, setIsCalculating] = useState(false);
  // Message d'erreur éventuel si l'API de calcul ne répond pas correctement.
  const [calculationError, setCalculationError] = useState('');

  // Convertit la surface saisie en nombre utilisable par la simulation.
  const parsedHectares = Number(hectares);
  // Vérifie que la surface est bien positive avant d'autoriser le calcul.
  const canCalculate = Number.isFinite(parsedHectares) && parsedHectares > 0;

  // Anime le montant dès que l'écran résultat reçoit une nouvelle estimation.
  useEffect(() => {
    // Ne lance l'animation que lorsque le résultat est visible et disponible.
    if (step !== 'cereal-result' || !result) {
      return;
    }

    // Valeur de départ volontairement remise à zéro pour provoquer l'effet de montée.
    setAnimatedAmount(0);

    // Date de départ utilisée pour calculer une progression fluide et indépendante du framerate.
    const startedAt = performance.now();
    // Durée courte: assez visible pour libérer l'effet récompense, sans ralentir l'utilisateur.
    const duration = 1300;
    // Identifiant de frame conservé pour annuler proprement l'animation si la modale change.
    let frameId = 0;

    // Fonction d'easing qui accélère au début puis ralentit près du montant final.
    const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

    // Boucle d'animation déclenchée par le navigateur.
    const animateAmount = (now: number) => {
      // Progression comprise entre 0 et 1.
      const progress = Math.min(1, (now - startedAt) / duration);
      // Valeur intermédiaire affichée dans le compteur.
      const nextAmount = result.amount * easeOutCubic(progress);

      setAnimatedAmount(nextAmount);

      // Continue jusqu'à atteindre exactement la valeur finale.
      if (progress < 1) {
        frameId = requestAnimationFrame(animateAmount);
      } else {
        setAnimatedAmount(result.amount);
      }
    };

    // Démarre le compteur à la prochaine frame.
    frameId = requestAnimationFrame(animateAmount);

    // Nettoie l'animation si l'utilisateur ferme ou modifie la simulation.
    return () => cancelAnimationFrame(frameId);
  }, [result, step]);

  // Ouvre la pop-up en revenant toujours au choix initial.
  const openSimulation = () => {
    setStep('choice');
    setResult(null);
    setCalculationError('');
    setIsOpen(true);
  };

  // Ferme la pop-up sans supprimer les dernières valeurs saisies.
  const closeSimulation = () => {
    setIsOpen(false);
  };

  // Lance le parcours dédié aux déchets de culture céréalière.
  const startCerealSimulation = () => {
    setStep('cereal-form');
    setResult(null);
    setCalculationError('');
  };

  // Calcule une estimation temporaire puis affiche l'écran résultat.
  const submitCerealSimulation = async (event: FormEvent<HTMLFormElement>) => {
    // Empêche le rechargement complet de la page lors de la validation.
    event.preventDefault();

    // Bloque la simulation si la surface n'est pas exploitable.
    if (!canCalculate) {
      return;
    }

    // Affiche un état de calcul pendant que le serveur exécute le vrai moteur de valorisation.
    setIsCalculating(true);
    // Supprime l'ancien message d'erreur avant une nouvelle tentative.
    setCalculationError('');

    try {
      /**
       * Le vrai calcul est volontairement appelé via une route serveur Next.js.
       * Les tables de rendement, prix de marché et primes ne sont donc pas exposées dans le bundle frontend.
       * Cette route pourra ensuite appeler un programme Python tout en gardant le même contrat JSON.
       */
      const response = await fetch('/api/simulations/cereal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropType,
          hectares: parsedHectares,
        }),
      });

      // Remonte une erreur lisible si le serveur refuse ou échoue au calcul.
      if (!response.ok) {
        throw new Error('Le calcul serveur a échoué.');
      }

      // Lit le résultat calculé côté serveur.
      const serverResult = (await response.json()) as SimulationResult;

      setResult(serverResult);
      setAnimatedAmount(0);
      setStep('cereal-result');
    } catch {
      // Affiche une erreur douce sans fermer la modale.
      setCalculationError('Impossible de calculer la valorisation pour le moment.');
    } finally {
      // Termine l'état de chargement dans tous les cas.
      setIsCalculating(false);
    }
  };

  // Retourne la section de simulation et sa pop-up moderne.
  return (
    // Section finale qui invite l'utilisateur à lancer une simulation.
    <section id="simulation" className="simulation">
      {/* Conteneur central pour garder le contenu aligné avec le reste de la page. */}
      <div className="container simulation-content">
        {/* Bloc texte principal de la section. */}
        <div className="simulation-copy">
          {/* Titre demandé pour la section. */}
          <h2>Je simule une revalorisation de déchet</h2>
          {/* Description courte qui explique l'action attendue. */}
          <p>
            Choisissez votre flux de matière, puis estimez comment il peut entrer dans une boucle
            locale de protéines, d&apos;engrais et de revenus territoriaux.
          </p>
        </div>

        {/* Colonne d'action qui place l'animation directement au-dessus du bouton. */}
        <div className="simulation-action">
          {/* Animation illustrative placée dans la section de simulation. */}
          <div className="simulation-animation">
            <Lottie
              // Données JSON importées depuis lottiefiles/IoT digital farming with drone.json.
              animationData={droneFarmAnimation}
              // Répète l'animation pour garder une interface vivante.
              loop={true}
              // Lance automatiquement l'animation quand la section est visible.
              autoplay={true}
              // L'animation remplit son cadre CSS.
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Bouton principal qui ouvre la pop-up de simulation. */}
          <button
            className="btn btn-primary simulation-button"
            type="button"
            onClick={openSimulation}
          >
            Lancer la simulation
          </button>
        </div>
      </div>

      {/* Pop-up affichée uniquement lorsque l'utilisateur lance la simulation. */}
      {isOpen && (
        // Overlay plein écran; un clic à l'extérieur ferme la pop-up.
        <div className="modal-overlay" onClick={closeSimulation}>
          {/* Panneau de simulation; stopPropagation évite la fermeture au clic interne. */}
          <div className="modal simulation-modal" onClick={(event) => event.stopPropagation()}>
            {/* Bouton de fermeture de la pop-up. */}
            <button className="modal-close" type="button" onClick={closeSimulation}>
              ×
            </button>

            {/* Étape initiale: choix du type de déchet à revendre. */}
            {step === 'choice' && (
              <>
                {/* Titre de la pop-up. */}
                <h2>Quel déchet souhaitez-vous revendre ?</h2>
                {/* Phrase d'aide pour orienter le choix utilisateur. */}
                <p className="modal-intro">
                  Sélectionnez le flux qui correspond à votre exploitation pour démarrer la
                  simulation.
                </p>

                {/* Deux choix de simulation proposés dans une grille moderne. */}
                <div className="simulation-choice-grid">
                  {/* Choix pour les résidus issus des cultures céréalières. */}
                  <button
                    className="simulation-choice-card"
                    type="button"
                    onClick={startCerealSimulation}
                  >
                    <span className="simulation-choice-label">Culture céréalière</span>
                    <span className="simulation-choice-title">
                      Revendre des déchets de culture céréalière
                    </span>
                    <span className="simulation-choice-description">
                      Pailles, sons, issues de nettoyage ou coproduits végétaux pouvant alimenter
                      une unité de bioconversion par insectes.
                    </span>
                  </button>

                  {/* Choix pour les déchets biologiques issus d'élevage de volaille. */}
                  <button
                    className="simulation-choice-card"
                    type="button"
                    onClick={closeSimulation}
                  >
                    <span className="simulation-choice-label">Élevage de volaille</span>
                    <span className="simulation-choice-title">
                      Revendre des déchets biologiques d&apos;élevage
                    </span>
                    <span className="simulation-choice-description">
                      Fientes, litières et matières organiques pouvant être stabilisées en
                      amendement organique pour les sols.
                    </span>
                  </button>
                </div>
              </>
            )}

            {/* Étape formulaire: collecte des entrées nécessaires au futur moteur Python. */}
            {step === 'cereal-form' && (
              <>
                {/* Bouton secondaire pour revenir au choix des flux. */}
                <button className="simulation-back" type="button" onClick={() => setStep('choice')}>
                  Retour
                </button>

                {/* Titre du formulaire céréales. */}
                <h2>Culture céréalière</h2>
                {/* Explication courte du calcul temporaire. */}
                <p className="modal-intro">
                  Indiquez la culture et la surface exploitée. Le calcul est exécuté côté serveur
                  pour garder les hypothèses métier hors du frontend.
                </p>

                {/* Formulaire qui prépare exactement les entrées du futur programme Python. */}
                <form className="simulation-form" onSubmit={submitCerealSimulation}>
                  {/* Groupe de sélection du type de culture. */}
                  <div className="simulation-field">
                    <span className="simulation-field-label">Type de culture</span>
                    {/* Contrôle segmenté plus lisible qu'un select pour deux choix seulement. */}
                    <div className="simulation-segmented" role="group" aria-label="Type de culture">
                      {(['ble', 'mais'] as CropType[]).map((type) => (
                        <button
                          key={type}
                          className={`simulation-segment ${
                            cropType === type ? 'simulation-segment-active' : ''
                          }`}
                          type="button"
                          onClick={() => setCropType(type)}
                        >
                          {cropLabels[type]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Champ de saisie du nombre d'hectares. */}
                  <label className="simulation-field">
                    <span className="simulation-field-label">Nombre d&apos;hectares</span>
                    <input
                      className="simulation-input"
                      type="number"
                      min="0"
                      step="0.1"
                      value={hectares}
                      onChange={(event) => setHectares(event.target.value)}
                      placeholder="Exemple : 25"
                    />
                  </label>

                  {/* Bouton de calcul temporaire. */}
                  <button
                    className="btn btn-primary simulation-form-submit"
                    type="submit"
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'Calcul en cours...' : 'Estimer la valorisation'}
                  </button>
                  {/* Message d'erreur affiché seulement si le calcul serveur échoue. */}
                  {calculationError && (
                    <p className="simulation-error" role="alert">
                      {calculationError}
                    </p>
                  )}
                </form>
              </>
            )}

            {/* Étape résultat: visualisation moderne du revenu potentiel. */}
            {step === 'cereal-result' && result && (
              <>
                {/* Bouton secondaire pour modifier les valeurs d'entrée. */}
                <button
                  className="simulation-back"
                  type="button"
                  onClick={() => setStep('cereal-form')}
                >
                  Modifier
                </button>

                {/* Titre du résultat de simulation. */}
                <h2>Potentiel de revalorisation</h2>
                {/* Phrase de contexte du résultat temporaire. */}
                <p className="modal-intro">
                  Estimation démonstrative pour {parsedHectares.toLocaleString('fr-FR')} hectares de{' '}
                  {cropLabels[cropType].toLowerCase()}.
                </p>

                {/* Carte visuelle principale qui met en avant le revenu estimé. */}
                <div className="simulation-result-card">
                  <span className="simulation-result-kicker">Revenu potentiel</span>
                  <strong className="simulation-result-amount">
                    {euroFormatter.format(animatedAmount)}
                  </strong>
                  <span className="simulation-result-note">
                    Calcul basé sur les rendements récupérables, le prix marché et la prime de
                    valorisation issus du moteur serveur.
                  </span>
                  {/* Barre décorative proportionnelle pour donner une lecture visuelle du potentiel. */}
                  <div className="simulation-result-meter" aria-hidden="true">
                    <span
                      style={{
                        width: `${Math.min(100, Math.max(18, result.amount / 35))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Indicateurs secondaires qui détaillent le résultat. */}
                <div className="simulation-result-grid">
                  <div>
                    <span>Tonnage valorisable</span>
                    <strong>{result.residueTons.toFixed(1).replace('.', ',')} t</strong>
                  </div>
                  <div>
                    <span>Prix TerraLoop retenu</span>
                    <strong>{euroFormatter.format(result.pricePerTon)} / t</strong>
                  </div>
                  <div>
                    <span>Prime vs marché</span>
                    <strong>+{result.bonusPct}%</strong>
                  </div>
                  <div>
                    <span>Gain additionnel</span>
                    <strong>{euroFormatter.format(result.bonusEuros)}</strong>
                  </div>
                  <div>
                    <span>Valeur marché</span>
                    <strong>{euroFormatter.format(result.marketRevenueEuros)}</strong>
                  </div>
                  <div>
                    <span>Résidus / ha</span>
                    <strong>
                      {result.residuePerHa.toLocaleString('fr-FR', {
                        maximumFractionDigits: 0,
                      })}{' '}
                      kg
                    </strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
