// Directive Next.js: cette section observe le viewport pour déclencher son graphique animé.
'use client';

// Import du hook qui limite les animations au moment où la section devient visible.
import { useInView } from '@/hooks/useInView';

/**
 * Composant BioConversion - Section éditoriale avec image de fond
 * Explique comment les biodéchets agricoles sont convertis en protéines par les larves
 */
export function BioConversion() {
  // Observe la section pour déclencher les courbes uniquement quand l'utilisateur arrive dessus.
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.25 });

  // Retourne une section immersive avec texte posé sur l'image de fond.
  return (
    // Section dédiée à la transformation biologique des déchets agricoles.
    <section id="conversion" className={`bio-conversion ${isInView ? 'is-in-view' : ''}`} ref={ref}>
      {/* Voile sombre qui garantit la lisibilité du texte sur l'image. */}
      <div className="bio-conversion-overlay">
        {/* Conteneur central qui place le texte à gauche et le graphique à droite. */}
        <div className="container bio-conversion-content">
          {/* Colonne texte de la section immersive. */}
          <div className="bio-conversion-copy">
            {/* Petit libellé qui introduit le sujet de la section. */}
            <p className="bio-conversion-kicker">La biologie comme moteur industriel</p>
            {/* Titre principal de la section. */}
            <h2>Une chaîne biotech pour transformer la biomasse</h2>
            {/* Texte explicatif sur le rôle des larves dans la revalorisation. */}
            <p>
              Les coproduits végétaux sont broyés, humidifiés et préparés pour devenir un substrat
              que les insectes savent convertir avec une efficacité biologique remarquable.
            </p>
            {/* Texte positionnant la biologie comme technologie avancée. */}
            <p>
              Cette machinerie biologique, guidée par le code génétique, transforme une biomasse
              sous-exploitée en protéines pour volailles, réduit la dépendance au soja importé et
              referme la boucle avec un fertilisant organique restitué aux sols.
            </p>
          </div>

          {/* Graphique animé comparant une dégradation passive et une bioconversion par larves. */}
          <div
            className="bio-absorption-card"
            aria-label="Graphique comparatif d'absorption des déchets"
          >
            {/* En-tête court du graphique. */}
            <div className="bio-absorption-header">
              <span>Absorption des déchets organiques</span>
              <strong>14 jours</strong>
            </div>

            {/* Zone du graphique dessinée en SVG pour garder un rendu net et léger. */}
            <div className="bio-absorption-chart">
              <svg
                viewBox="0 0 420 260"
                role="img"
                aria-label="Courbe avec larves atteignant environ 70%, courbe sans larves atteignant environ 18%"
              >
                {/* Lignes horizontales de lecture. */}
                <g className="bio-chart-grid">
                  <line x1="48" y1="40" x2="390" y2="40" />
                  <line x1="48" y1="95" x2="390" y2="95" />
                  <line x1="48" y1="150" x2="390" y2="150" />
                  <line x1="48" y1="205" x2="390" y2="205" />
                </g>
                {/* Axe vertical simplifié. */}
                <path className="bio-chart-axis" d="M48 30 V214 H390" />
                {/* Courbe témoin sans machinerie moléculaire des larves. */}
                <path
                  className="bio-chart-line bio-chart-line-passive"
                  d="M48 205 C116 199 174 190 232 180 C292 169 342 160 390 151"
                />
                {/* Courbe avec bioconversion par larves. */}
                <path
                  className="bio-chart-line bio-chart-line-living"
                  d="M48 205 C92 186 120 154 158 128 C212 91 280 70 390 60"
                />
                {/* Libellé du taux avec larves. */}
                <text className="bio-chart-value bio-chart-value-living" x="310" y="48">
                  ≈70%
                </text>
                {/* Libellé du taux sans larves. */}
                <text className="bio-chart-value bio-chart-value-passive" x="312" y="140">
                  ≈18%
                </text>
                {/* Libellés des axes. */}
                <text className="bio-chart-label" x="48" y="236">
                  jour 0
                </text>
                <text className="bio-chart-label" x="342" y="236">
                  jour 14
                </text>
              </svg>
            </div>

            {/* Légende du graphique avec deux scénarios. */}
            <div className="bio-absorption-legend">
              <span>
                <i className="bio-legend-living" />
                Avec larves et enzymes
              </span>
              <span>
                <i className="bio-legend-passive" />
                Dégradation passive
              </span>
            </div>

            {/* Note scientifique prudente sur l'ordre de grandeur. */}
            <p className="bio-absorption-note">
              Ordre de grandeur indicatif: les larves de mouche soldat noire peuvent dépasser 70% de
              réduction de certains déchets organiques, selon le substrat et les conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
