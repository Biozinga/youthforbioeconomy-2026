import { PredictionMap } from './PredictionMap';
import { TractorVideo } from './TractorVideo';

/**
 * Composant Features - synthèse scientifique des pistes de détection ZEN.
 */
export function Features() {
  return (
    <section id="benefits" className="features science-section">
      <div className="container science-section-inner">
        <div className="science-section-header">
          <span className="section-badge">Science pole</span>
          <h2>Identifier rapidement la zéaralénone ou sa source.</h2>
          <p>
            Pure Graine concentre le travail scientifique sur trois stratégies complémentaires : un
            système aptamère-toehold fluorescent, une aptazyme colorimétrique et une détection
            génétique LAMP de Fusarium.
          </p>
        </div>

        <article className="field-lab-panel">
          <div className="field-lab-copy">
            <span className="section-badge">Terrain augmenté</span>
            <h3>Transformer votre champ en laboratoire d’analyse.</h3>
            <p>
              Pure Graine rapproche le test du terrain : un prélèvement, une lecture simple, puis un
              résultat exploitable en 30 minutes pour repérer la zéaralénone avant qu’elle ne
              fragilise la récolte.
            </p>
            <p>
              Comme le test est peu cher, il devient possible de multiplier les points de mesure au
              fil de la saison. Chaque résultat nourrit un modèle d’IA pensé pour aider les
              agriculteurs d’Europe à anticiper les zones à risque et à décider plus vite.
            </p>
            <div className="field-lab-metrics" aria-label="Promesses terrain Pure Graine">
              <span>
                <strong>30 min</strong>
                <small>résultat terrain</small>
              </span>
              <span>
                <strong>Tests répétés</strong>
                <small>coût accessible</small>
              </span>
              <span>
                <strong>IA Europe</strong>
                <small>données partagées</small>
              </span>
            </div>
          </div>

          <div className="field-lab-media">
            <TractorVideo />
          </div>
        </article>

        <PredictionMap />
      </div>
    </section>
  );
}
