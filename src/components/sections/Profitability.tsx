// Directive Next.js: cette section est interactive et utilise une animation Lottie côté client.
'use client';

// Import du type FormEvent si le calcul évolue plus tard vers une validation de formulaire.
import type { FormEvent } from 'react';
// Import des hooks React pour piloter les formulaires et les calculs.
import { useEffect, useMemo, useState } from 'react';
// Import du composant Lottie pour afficher l'animation Finance.
import Lottie from 'lottie-react';
// Import du hook qui déclenche l'animation uniquement quand la section est visible.
import { useInView } from '@/hooks/useInView';
// Import de l'animation finance fournie avec le projet.
import financeAnimation from '../../../lottiefiles/Finance.json';

// Modes de calcul proposés dans l'interface.
type ProfitabilityMode = 'cultures' | 'fientes';

// Structure du résultat renvoyé par l'API.
type ProfitabilityResult = {
  mode: ProfitabilityMode;
  label: string;
  unitLabel: string;
  recommended: {
    label: string;
    marketPriceTonne: number;
    premiumPct: number;
    recommendedBuyPrice: number;
  };
  volume: {
    input: number;
    primaryLabel: string;
    primaryValue: number;
    primaryUnit: string;
    secondaryLabel: string;
    secondaryValue: number;
    secondaryUnit: string;
  };
  finance: {
    costPurchase: number;
    costLogistics: number;
    costProcessing: number;
    totalCosts: number;
    revenueTotal: number;
    grossMargin: number;
    marginPct: number;
    breakEvenSellPrice: number;
  };
};

// Structure des montants animés dans le tableau de rentabilité.
type AnimatedFinance = {
  grossMargin: number;
  revenueTotal: number;
  totalCosts: number;
};

// Options de cultures issues du script de rentabilité cultures.
const cropOptions = [
  { key: 'mais', label: 'Maïs' },
  { key: 'ble', label: 'Blé' },
  { key: 'colza', label: 'Colza' },
  { key: 'tournesol', label: 'Tournesol' },
];

// Options d'espèces issues du script de rentabilité fientes.
const poultryOptions = [
  { key: 'poulet', label: 'Poulet' },
  { key: 'poule', label: 'Poule' },
  { key: 'dinde', label: 'Dinde' },
  { key: 'canard', label: 'Canard' },
];

// Formateur monétaire utilisé dans les cartes de résultat.
const euroFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

// Formateur compact pour les volumes et pourcentages.
const numberFormatter = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 1,
});

// État initial des montants animés.
const emptyAnimatedFinance: AnimatedFinance = {
  grossMargin: 0,
  revenueTotal: 0,
  totalCosts: 0,
};

// Courbe d'animation douce similaire au compteur du simulateur de revalorisation.
function easeOutCubic(progress: number) {
  // Accélère au début puis ralentit à l'approche de la valeur finale.
  return 1 - Math.pow(1 - progress, 3);
}

// Section interactive de pilotage économique TerraLoop.
export function Profitability() {
  // Observe la section pour différer l'animation Finance.
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.24 });
  // Mode de calcul actif.
  const [mode, setMode] = useState<ProfitabilityMode>('cultures');
  // Flux sélectionné dans le mode actif.
  const [selectedKey, setSelectedKey] = useState('mais');
  // Quantité principale: hectares ou nombre d'animaux.
  const [quantity, setQuantity] = useState('100');
  // Prix d'achat payé au producteur.
  const [buyPriceTonne, setBuyPriceTonne] = useState('50');
  // Prix de vente de sortie: larves en kg ou engrais en kg.
  const [sellPrice, setSellPrice] = useState('12');
  // Coût logistique à la tonne.
  const [logisticCostTonne, setLogisticCostTonne] = useState('15');
  // Coût de transformation selon le mode.
  const [processingCost, setProcessingCost] = useState('0.8');
  // Résultat calculé côté serveur.
  const [result, setResult] = useState<ProfitabilityResult | null>(null);
  // État d'attente pendant l'appel API.
  const [isLoading, setIsLoading] = useState(false);
  // Message d'erreur doux si le calcul échoue.
  const [error, setError] = useState('');
  // État qui affiche ou masque les hypothèses économiques avancées.
  const [showMarketSettings, setShowMarketSettings] = useState(false);
  // Montants affichés pendant l'animation de calcul.
  const [animatedFinance, setAnimatedFinance] = useState<AnimatedFinance>(emptyAnimatedFinance);

  // Liste d'options affichée selon le mode actif.
  const options = useMemo(() => (mode === 'cultures' ? cropOptions : poultryOptions), [mode]);

  // Valeur maximale du ratio de barre financière.
  const financialMax = Math.max(result?.finance.revenueTotal ?? 1, result?.finance.totalCosts ?? 1);

  // Calcule la largeur animée d'une barre financière.
  const getAnimatedBarWidth = (value: number) => {
    // Garde la barre invisible tant que l'animation n'a pas commencé.
    if (!result || value <= 0) {
      return '0%';
    }

    // Calcule la largeur relative au plus grand montant financier.
    return `${Math.max(4, (value / financialMax) * 100)}%`;
  };

  // Change le mode et applique des valeurs par défaut cohérentes avec les scripts fournis.
  const switchMode = (nextMode: ProfitabilityMode) => {
    // Met à jour le mode actif.
    setMode(nextMode);
    // Réinitialise le message d'erreur.
    setError('');
    // Supprime l'ancien résultat pour forcer un nouveau calcul explicite.
    setResult(null);
    // Remet les montants animés à zéro.
    setAnimatedFinance(emptyAnimatedFinance);

    // Applique les paramètres d'exemple du script cultures.
    if (nextMode === 'cultures') {
      setSelectedKey('mais');
      setQuantity('100');
      setBuyPriceTonne('50');
      setSellPrice('12');
      setLogisticCostTonne('15');
      setProcessingCost('0.8');
      return;
    }

    // Applique les paramètres d'exemple du script fientes.
    setSelectedKey('poulet');
    setQuantity('20000');
    setBuyPriceTonne('20');
    setSellPrice('0.85');
    setLogisticCostTonne('20');
    setProcessingCost('45');
  };

  // Anime les montants financiers quand un nouveau calcul arrive.
  useEffect(() => {
    // Stoppe si aucun résultat n'a encore été calculé.
    if (!result) {
      setAnimatedFinance(emptyAnimatedFinance);
      return;
    }

    // Durée de l'animation des montants.
    const duration = 1400;
    // Moment de départ de l'animation.
    const startedAt = performance.now();
    // Identifiant de frame pour pouvoir annuler proprement.
    let frameId = 0;

    // Remet les compteurs à zéro pour reproduire l'effet dopamine du simulateur.
    setAnimatedFinance(emptyAnimatedFinance);

    // Avance les montants de zéro vers leur valeur finale.
    const animateFinance = (now: number) => {
      // Progression comprise entre 0 et 1.
      const progress = Math.min(1, (now - startedAt) / duration);
      // Progression lissée.
      const easedProgress = easeOutCubic(progress);

      // Met à jour les trois montants animés.
      setAnimatedFinance({
        grossMargin: result.finance.grossMargin * easedProgress,
        revenueTotal: result.finance.revenueTotal * easedProgress,
        totalCosts: result.finance.totalCosts * easedProgress,
      });

      // Continue jusqu'à atteindre les valeurs finales.
      if (progress < 1) {
        frameId = requestAnimationFrame(animateFinance);
      } else {
        setAnimatedFinance({
          grossMargin: result.finance.grossMargin,
          revenueTotal: result.finance.revenueTotal,
          totalCosts: result.finance.totalCosts,
        });
      }
    };

    // Lance l'animation à la prochaine frame.
    frameId = requestAnimationFrame(animateFinance);

    // Nettoie la frame si un nouveau calcul arrive avant la fin.
    return () => cancelAnimationFrame(frameId);
  }, [result]);

  // Appelle l'API de rentabilité uniquement quand l'utilisateur clique sur Calculer.
  const calculateProfitability = async (event?: FormEvent<HTMLFormElement>) => {
    // Empêche un éventuel rechargement si le calcul est déclenché par formulaire.
    event?.preventDefault();
    // Affiche un état de calcul.
    setIsLoading(true);
    // Réinitialise l'erreur précédente.
    setError('');

    try {
      // Envoie les paramètres à la route serveur qui reprend les scripts Python.
      const response = await fetch('/api/profitability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode,
          key: selectedKey,
          quantity,
          buyPriceTonne,
          sellPrice,
          logisticCostTonne,
          processingCost,
        }),
      });

      // Remonte une erreur si l'API refuse le calcul.
      if (!response.ok) {
        throw new Error('Calcul impossible.');
      }

      // Lit le résultat structuré.
      const nextResult = (await response.json()) as ProfitabilityResult;

      // Déclenche l'affichage et l'animation.
      setResult(nextResult);
    } catch {
      // Affiche un message simple si le calcul échoue.
      setError('Impossible de calculer la rentabilité pour le moment.');
    } finally {
      // Termine l'état de chargement.
      setIsLoading(false);
    }
  };

  // Renvoie la section interactive.
  return (
    <section id="rentabilite" className="profitability" ref={ref}>
      <div className="container profitability-grid">
        <div className="profitability-copy">
          <h2>Tester la rentabilité de TerraLoop</h2>
          <p>
            Ajustez les prix d&apos;achat, les volumes, la logistique et la transformation pour voir
            comment TerraLoop garde une marge tout en rémunérant mieux les producteurs.
          </p>

          <div className="profitability-animation" aria-hidden="true">
            {isInView && (
              <Lottie
                animationData={financeAnimation}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>

        <div className="profitability-panel">
          <div className="profitability-tabs" aria-label="Type de flux à simuler">
            <button
              className={mode === 'cultures' ? 'profitability-tab-active' : ''}
              type="button"
              onClick={() => switchMode('cultures')}
            >
              Cultures
            </button>
            <button
              className={mode === 'fientes' ? 'profitability-tab-active' : ''}
              type="button"
              onClick={() => switchMode('fientes')}
            >
              Fientes
            </button>
          </div>

          <form className="profitability-controls" onSubmit={calculateProfitability}>
            <div className="profitability-field profitability-option-field">
              <span>{mode === 'cultures' ? 'Culture' : 'Élevage'}</span>
              <div className="profitability-option-grid">
                {options.map((option) => (
                  <button
                    key={option.key}
                    className={selectedKey === option.key ? 'profitability-option-active' : ''}
                    type="button"
                    onClick={() => setSelectedKey(option.key)}
                    aria-pressed={selectedKey === option.key}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="profitability-field">
              <span>{mode === 'cultures' ? 'Surface' : 'Animaux'}</span>
              <input
                min="1"
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </label>

            <button
              className="profitability-market-toggle"
              type="button"
              onClick={() => setShowMarketSettings((current) => !current)}
              aria-expanded={showMarketSettings}
            >
              Paramètres de marché
            </button>

            {showMarketSettings && (
              <div className="profitability-market-settings">
                <label className="profitability-field">
                  <span>Prix achat producteur €/t</span>
                  <input
                    min="0"
                    step="0.1"
                    type="number"
                    value={buyPriceTonne}
                    onChange={(event) => setBuyPriceTonne(event.target.value)}
                  />
                </label>

                <label className="profitability-field">
                  <span>
                    {mode === 'cultures' ? 'Prix vente larves €/kg' : 'Prix vente engrais €/kg'}
                  </span>
                  <input
                    min="0"
                    step="0.01"
                    type="number"
                    value={sellPrice}
                    onChange={(event) => setSellPrice(event.target.value)}
                  />
                </label>

                <label className="profitability-field">
                  <span>Logistique €/t</span>
                  <input
                    min="0"
                    step="0.1"
                    type="number"
                    value={logisticCostTonne}
                    onChange={(event) => setLogisticCostTonne(event.target.value)}
                  />
                </label>

                <label className="profitability-field">
                  <span>
                    {mode === 'cultures'
                      ? 'Transformation €/kg larves'
                      : 'Transformation €/t brute'}
                  </span>
                  <input
                    min="0"
                    step="0.01"
                    type="number"
                    value={processingCost}
                    onChange={(event) => setProcessingCost(event.target.value)}
                  />
                </label>
              </div>
            )}

            <button
              className="btn btn-primary profitability-calculate-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Calcul en cours...' : result ? 'Recalculer' : 'Calculer'}
            </button>
          </form>

          {error && <p className="profitability-error">{error}</p>}

          {result && (
            <div
              className={`profitability-result ${isLoading ? 'profitability-result-loading' : ''}`}
            >
              <div className="profitability-result-main">
                <span>Marge nette plateforme</span>
                <strong>{euroFormatter.format(animatedFinance.grossMargin)}</strong>
                <em>{numberFormatter.format(result.finance.marginPct)}% de marge</em>
              </div>

              <div
                className="profitability-bars"
                aria-label="Comparaison chiffre d'affaires et coûts"
              >
                <div>
                  <span>Chiffre d&apos;affaires</span>
                  <strong>{euroFormatter.format(animatedFinance.revenueTotal)}</strong>
                  <i
                    style={{
                      width: getAnimatedBarWidth(animatedFinance.revenueTotal),
                    }}
                  />
                </div>
                <div>
                  <span>Coûts totaux</span>
                  <strong>{euroFormatter.format(animatedFinance.totalCosts)}</strong>
                  <i
                    className="profitability-cost-bar"
                    style={{
                      width: getAnimatedBarWidth(animatedFinance.totalCosts),
                    }}
                  />
                </div>
              </div>

              <div className="profitability-metrics">
                <div>
                  <span>{result.volume.primaryLabel}</span>
                  <strong>
                    {numberFormatter.format(result.volume.primaryValue)} {result.volume.primaryUnit}
                  </strong>
                </div>
                <div>
                  <span>{result.volume.secondaryLabel}</span>
                  <strong>
                    {numberFormatter.format(result.volume.secondaryValue)}{' '}
                    {result.volume.secondaryUnit}
                  </strong>
                </div>
                <div>
                  <span>Prix achat conseillé</span>
                  <strong>{euroFormatter.format(result.recommended.recommendedBuyPrice)}/t</strong>
                </div>
                <div>
                  <span>Point mort vente</span>
                  <strong>
                    {mode === 'cultures'
                      ? `${numberFormatter.format(result.finance.breakEvenSellPrice)} €/kg`
                      : `${numberFormatter.format(result.finance.breakEvenSellPrice)} €/kg`}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
