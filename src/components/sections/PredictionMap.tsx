'use client';

import { useMemo, useState } from 'react';
import { SatelliteMap, type MapLocation } from './SatelliteMap';

const fungalTargets = ['Fusarium graminearum', 'Fusarium culmorum', 'Fusarium verticillioides'];

const toxinTargets = [
  { label: 'Zéaralénone (ZEN)', thresholdUgKg: 100, growthWeight: 0.92 },
  { label: 'Déoxynivalénol (DON)', thresholdUgKg: 1250, growthWeight: 1.08 },
  { label: 'Fumonisines', thresholdUgKg: 1000, growthWeight: 1 },
] as const;

type ToxinTarget = (typeof toxinTargets)[number];
type ToxinLabel = ToxinTarget['label'];

type CurvePoint = {
  day: number;
  value: number;
};

type WeatherDay = {
  date: string;
  humidity: number;
  rainMm: number;
  temperatureMax: number;
  temperatureMin: number;
  windKmh: number;
};

type ChartProps = {
  areaClassName?: string;
  label: string;
  lineClassName?: string;
  points: CurvePoint[];
  threshold?: number;
  unit: string;
};

function formatCoordinate(value: number, positiveSuffix: string, negativeSuffix: string) {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positiveSuffix : negativeSuffix}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

function buildPreHarvestWeather(harvestDate: Date, seed: number): WeatherDay[] {
  return Array.from({ length: 7 }, (_, index) => {
    const dayOffset = index - 7;
    const daySeed = Math.abs(Math.sin(seed * 18.37 + index * 4.91));
    const temperatureMin = Math.round(9 + daySeed * 8 + index * 0.35);
    const temperatureMax = Math.round(
      temperatureMin + 7 + Math.abs(Math.cos(seed * 7 + index)) * 6
    );
    const rainMm = Number((Math.max(0, Math.sin(seed * 9 + index * 1.7)) * 13.5).toFixed(1));
    const humidity = Math.round(clamp(58 + rainMm * 2.1 + daySeed * 18, 52, 96));
    const windKmh = Math.round(8 + Math.abs(Math.cos(seed * 12 + index * 2.2)) * 28);

    return {
      date: formatDate(addDays(harvestDate, dayOffset)),
      humidity,
      rainMm,
      temperatureMax,
      temperatureMin,
      windKmh,
    };
  });
}

function buildPrediction(
  fungus: string,
  toxin: ToxinTarget,
  location: MapLocation | null,
  currentDate: Date
) {
  if (!location) {
    return null;
  }

  const seed = Math.abs(
    Math.sin(
      location.lat * 12.9898 + location.lng * 78.233 + fungus.length * 4.7 + toxin.label.length
    )
  );
  const fungalStart = 8 + seed * 18;
  const harvestOffsetDays = 24 + Math.round(seed * 16);
  const harvestDate = addDays(currentDate, harvestOffsetDays);
  const fungalGrowth = 1.13 + seed * 0.12 + toxin.growthWeight * 0.015;
  const fungalCurve = Array.from({ length: 12 }, (_, index) => {
    const day = index * 3;
    const value = clamp(
      Math.round(fungalStart * Math.pow(fungalGrowth, index) + index * (2.2 + seed * 2.1)),
      0,
      100
    );

    return { day, value };
  });
  const contaminationUgKg = Math.round(
    toxin.thresholdUgKg *
      clamp(0.2 + seed * 0.86 + fungalCurve[0].value / 190 + toxin.growthWeight * 0.08, 0.18, 1.58)
  );
  const dailyToxinGrowth = 1.026 + seed * 0.042 + toxin.growthWeight * 0.009;
  const toxinCurve = Array.from({ length: 12 }, (_, index) => {
    const day = index * 3;
    const value = Math.round(contaminationUgKg * Math.pow(dailyToxinGrowth, day));

    return { day, value };
  });
  let thresholdDay: number | null = null;

  for (let day = 0; day <= 60; day += 1) {
    const projectedContamination = contaminationUgKg * Math.pow(dailyToxinGrowth, day);

    if (projectedContamination >= toxin.thresholdUgKg) {
      thresholdDay = day;
      break;
    }
  }

  return {
    contaminationUgKg,
    fungalCurve,
    fungalEnd: fungalCurve[fungalCurve.length - 1].value,
    harvestDate: formatDate(harvestDate),
    thresholdDate:
      thresholdDay === null
        ? 'Pas de dépassement prévu à 60 jours'
        : formatDate(addDays(currentDate, thresholdDay)),
    thresholdLabel:
      thresholdDay === null
        ? 'Sous le seuil suivi'
        : thresholdDay === 0
          ? 'Seuil déjà dépassé'
          : `Dépassement prévu dans ${thresholdDay} jours`,
    thresholdUgKg: toxin.thresholdUgKg,
    toxinCurve,
    weatherDays: buildPreHarvestWeather(harvestDate, seed),
  };
}

function PredictionChart({
  areaClassName = '',
  label,
  lineClassName = '',
  points,
  threshold,
  unit,
}: ChartProps) {
  const width = 680;
  const height = 260;
  const padding = 34;
  const values = points.map((point) => point.value);
  const maxValue = Math.max(...values, threshold ?? 0, 1);
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;
  const coordinates = points.map((point, index) => {
    const x = padding + (index / Math.max(points.length - 1, 1)) * plotWidth;
    const y = height - padding - (point.value / maxValue) * plotHeight;

    return { ...point, x, y };
  });
  const linePath = coordinates
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
  const thresholdY =
    threshold === undefined ? null : height - padding - (threshold / maxValue) * plotHeight;
  const lastPoint = coordinates[coordinates.length - 1];

  return (
    <svg
      className="prediction-chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
    >
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} />
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} />
      {thresholdY !== null && (
        <>
          <line
            className="prediction-chart-threshold"
            x1={padding}
            y1={thresholdY}
            x2={width - padding}
            y2={thresholdY}
          />
          <text x={padding + 8} y={Math.max(thresholdY - 8, 18)}>
            seuil {threshold} {unit}
          </text>
        </>
      )}
      <path className={`prediction-chart-area ${areaClassName}`} d={areaPath} />
      <path className={`prediction-chart-line ${lineClassName}`} d={linePath} />
      {coordinates.map((point) => (
        <circle key={point.day} cx={point.x} cy={point.y} r="4" />
      ))}
      {lastPoint && (
        <text x={lastPoint.x - 110} y={Math.max(lastPoint.y - 14, 18)}>
          {lastPoint.value} {unit} à J+{lastPoint.day}
        </text>
      )}
      <text x={padding} y={height - 7}>
        Aujourd’hui
      </text>
      <text x={width - padding - 56} y={height - 7}>
        J+33
      </text>
    </svg>
  );
}

export function PredictionMap() {
  const [selectedFungus, setSelectedFungus] = useState(fungalTargets[0]);
  const [selectedToxin, setSelectedToxin] = useState<ToxinLabel>(toxinTargets[0].label);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const currentDate = useMemo(() => new Date(), []);
  const today = useMemo(() => formatDate(currentDate), [currentDate]);
  const selectedToxinConfig = useMemo(
    () => toxinTargets.find((toxin) => toxin.label === selectedToxin) ?? toxinTargets[0],
    [selectedToxin]
  );
  const prediction = useMemo(
    () => buildPrediction(selectedFungus, selectedToxinConfig, selectedLocation, currentDate),
    [currentDate, selectedFungus, selectedLocation, selectedToxinConfig]
  );

  const handleLocationSelect = (location: MapLocation) => {
    setSelectedLocation(location);
    setHasSubmitted(false);
  };

  return (
    <section
      id="prediction-map"
      className="prediction-panel"
      aria-label="Test du modèle de prédiction Pure Graine"
    >
      <div className="prediction-panel-header">
        <span className="section-badge">Modèle de prédiction</span>
        <h3>Tester une zone agricole en quelques clics.</h3>
        <p>
          Choisissez les paramètres dans la fenêtre dédiée, cliquez sur la carte pour définir le
          lieu, puis lancez une modélisation locale utilisable même sans backend.
        </p>
      </div>

      <div className="prediction-toolbar" aria-label="Résumé des paramètres de prédiction">
        <div className="prediction-toolbar-grid">
          <div className="prediction-info-card">
            <span>Champignon</span>
            <strong>{selectedFungus}</strong>
          </div>
          <div className="prediction-info-card">
            <span>Toxine</span>
            <strong>{selectedToxin}</strong>
          </div>
          <div className="prediction-info-card">
            <span>Date</span>
            <strong>Aujourd’hui</strong>
            <small>{today}</small>
          </div>
          <div className="prediction-info-card">
            <span>Lieu</span>
            <strong>{selectedLocation ? 'Point sélectionné' : 'Cliquez sur la carte'}</strong>
            <small>
              {selectedLocation
                ? `${formatCoordinate(selectedLocation.lat, 'N', 'S')} · ${formatCoordinate(
                    selectedLocation.lng,
                    'E',
                    'O'
                  )}`
                : 'Coordonnées à définir'}
            </small>
          </div>
        </div>

        <div className="prediction-toolbar-actions">
          <button
            type="button"
            className="prediction-secondary-button"
            onClick={() => setIsSettingsOpen(true)}
          >
            Configurer le modèle
          </button>
          <button
            type="button"
            className="prediction-run-button"
            disabled={!selectedLocation}
            onClick={() => setHasSubmitted(true)}
          >
            Lancer la modélisation
          </button>
        </div>
      </div>

      <div className="prediction-map-frame">
        <SatelliteMap selectedLocation={selectedLocation} onLocationSelect={handleLocationSelect} />
      </div>

      <div className={`prediction-result${hasSubmitted && prediction ? ' is-visible' : ''}`}>
        {hasSubmitted && prediction ? (
          <>
            <div className="prediction-output-grid">
              <div>
                <span>Contamination toxine sélectionnée</span>
                <strong>{prediction.contaminationUgKg} µg/kg</strong>
                <small>Seuil suivi : {prediction.thresholdUgKg} µg/kg</small>
              </div>
              <div>
                <span>Date prédite de dépassement</span>
                <strong>{prediction.thresholdDate}</strong>
                <small>{prediction.thresholdLabel}</small>
              </div>
              <div>
                <span>Contamination fongique prédite</span>
                <strong>{prediction.fungalEnd}% à J+33</strong>
                <small>Évolution estimée pour {selectedFungus}.</small>
              </div>
            </div>

            <div className="prediction-graph-grid">
              <div className="prediction-chart-card">
                <div>
                  <span>Graphe dynamique</span>
                  <strong>Contamination en {selectedToxin}</strong>
                </div>
                <PredictionChart
                  label="Courbe d'évolution prédite de la contamination en toxine"
                  points={prediction.toxinCurve}
                  threshold={prediction.thresholdUgKg}
                  unit="µg/kg"
                />
              </div>
              <div className="prediction-chart-card">
                <div>
                  <span>Graphe dynamique</span>
                  <strong>Contamination en champignon</strong>
                </div>
                <PredictionChart
                  areaClassName="prediction-chart-area-blue"
                  label="Courbe d'évolution prédite de la contamination fongique"
                  lineClassName="prediction-chart-line-blue"
                  points={prediction.fungalCurve}
                  unit="%"
                />
              </div>
            </div>

            <div className="prediction-weather-panel">
              <div className="prediction-weather-header">
                <div>
                  <span>Météo simulée</span>
                  <strong>7 jours avant récolte</strong>
                </div>
                <small>Récolte estimée : {prediction.harvestDate}</small>
              </div>

              <div className="prediction-weather-grid">
                {prediction.weatherDays.map((day) => (
                  <article className="prediction-weather-card" key={day.date}>
                    <span>{day.date}</span>
                    <strong>
                      {day.temperatureMin}° / {day.temperatureMax}°C
                    </strong>
                    <small>
                      {day.rainMm} mm pluie · {day.humidity}% humidité · {day.windKmh} km/h vent
                    </small>
                  </article>
                ))}
              </div>

              <p className="prediction-weather-note">
                Données météo fictives pour l’instant, prêtes à être remplacées par le backend.
              </p>
            </div>
          </>
        ) : (
          <>
            <span>Sorties du modèle</span>
            <strong>En attente d’une parcelle</strong>
            <small>
              Sélectionnez les paramètres dans la pop-up, cliquez sur la carte, puis lancez la
              modélisation pour afficher les graphes et la météo avant récolte.
            </small>
          </>
        )}
      </div>

      {isSettingsOpen && (
        <div
          className="prediction-modal-backdrop"
          role="presentation"
          onMouseDown={() => setIsSettingsOpen(false)}
        >
          <div
            className="prediction-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prediction-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="prediction-modal-header">
              <div>
                <span className="section-badge">Entrées du modèle</span>
                <h4 id="prediction-modal-title">Paramètres de prédiction</h4>
              </div>
              <button
                type="button"
                className="prediction-modal-close"
                aria-label="Fermer les paramètres"
                onClick={() => setIsSettingsOpen(false)}
              >
                x
              </button>
            </div>

            <div className="prediction-control-group">
              <span className="prediction-control-label">Champignon à prédire</span>
              <div className="prediction-choice-grid prediction-choice-grid-modal">
                {fungalTargets.map((fungus) => (
                  <button
                    type="button"
                    key={fungus}
                    className={`prediction-choice${selectedFungus === fungus ? ' is-active' : ''}`}
                    aria-pressed={selectedFungus === fungus}
                    onClick={() => {
                      setSelectedFungus(fungus);
                      setHasSubmitted(false);
                    }}
                  >
                    {fungus}
                  </button>
                ))}
              </div>
            </div>

            <div className="prediction-control-group">
              <span className="prediction-control-label">Toxine à suivre</span>
              <div className="prediction-choice-grid prediction-choice-grid-modal">
                {toxinTargets.map((toxin) => (
                  <button
                    type="button"
                    key={toxin.label}
                    className={`prediction-choice${selectedToxin === toxin.label ? ' is-active' : ''}`}
                    aria-pressed={selectedToxin === toxin.label}
                    onClick={() => {
                      setSelectedToxin(toxin.label);
                      setHasSubmitted(false);
                    }}
                  >
                    {toxin.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="prediction-modal-date">
              <span>Date utilisée</span>
              <strong>Aujourd’hui</strong>
              <small>{today}</small>
            </div>

            <button
              type="button"
              className="prediction-run-button"
              onClick={() => setIsSettingsOpen(false)}
            >
              Valider les paramètres
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
