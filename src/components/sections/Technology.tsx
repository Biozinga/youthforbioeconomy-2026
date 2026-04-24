export function Technology() {
  return (
    <section id="technology" className="technology">
      <div className="container">
        <h2>Notre Technologie Brevetée</h2>
        <p className="section-subtitle">
          Capteur biologique nouvelle génération pour une détection ultra-précise
        </p>

        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">🧬</div>
            <h3>Biomarqueurs Multiples</h3>
            <p>
              Détection simultanée de plus de 50 biomarqueurs permettant une analyse complète de l'état du
              produit
            </p>
            <ul>
              <li>Détection enzymatique avancée</li>
              <li>Analyse protéomique</li>
              <li>Suivi métabolique</li>
            </ul>
          </div>

          <div className="tech-card">
            <div className="tech-icon">📡</div>
            <h3>Connectivité IoT Intégrée</h3>
            <p>
              Communication sans fil sécurisée en temps réel avec les serveurs cloud pour un suivi continu
            </p>
            <ul>
              <li>Protocole MQTT sécurisé</li>
              <li>Latence < 100ms</li>
              <li>Couverture réseau mondiale</li>
            </ul>
          </div>

          <div className="tech-card">
            <div className="tech-icon">🔒</div>
            <h3>Sécurité Blockchain</h3>
            <p>
              Enregistrement immuable de toutes les données sur blockchain pour garantir l'authenticité
            </p>
            <ul>
              <li>Certificats de traçabilité</li>
              <li>Horodatage cryptographique</li>
              <li>Immuabilité garantie</li>
            </ul>
          </div>

          <div className="tech-card">
            <div className="tech-icon">⚡</div>
            <h3>Autonomie Optimale</h3>
            <p>
              Batterie longue durée avec recharge solaire passive pour une utilisation jusqu'à 2 ans
            </p>
            <ul>
              <li>Batterie 5000mAh</li>
              <li>Panneaux solaires intégrés</li>
              <li>Consommation ultra-faible</li>
            </ul>
          </div>

          <div className="tech-card">
            <div className="tech-icon">🤖</div>
            <h3>Intelligence Artificielle</h3>
            <p>
              Algorithmes ML qui apprennent les patterns normaux de chaque produit pour détecter les anomalies
            </p>
            <ul>
              <li>Apprentissage continu</li>
              <li>Prédictions précises</li>
              <li>Alertes intelligentes</li>
            </ul>
          </div>

          <div className="tech-card">
            <div className="tech-icon">📊</div>
            <h3>Analytics Avancées</h3>
            <p>
              Dashboard complet avec visualisations, rapports et insights pour une prise de décision optimale
            </p>
            <ul>
              <li>Rapports en temps réel</li>
              <li>Prédictions de durée de vie</li>
              <li>Analyses prédictives</li>
            </ul>
          </div>
        </div>

        <div className="tech-highlights">
          <h3>Spécifications Techniques</h3>
          <div className="specs-grid">
            <div className="spec">
              <span className="spec-label">Précision</span>
              <span className="spec-value">99.9%</span>
            </div>
            <div className="spec">
              <span className="spec-label">Fréquence</span>
              <span className="spec-value">1 mesure/minute</span>
            </div>
            <div className="spec">
              <span className="spec-label">Plage Temp.</span>
              <span className="spec-value">-20°C à +60°C</span>
            </div>
            <div className="spec">
              <span className="spec-label">Portée IoT</span>
              <span className="spec-value">Mondiale</span>
            </div>
            <div className="spec">
              <span className="spec-label">Durée Vie</span>
              <span className="spec-value">2 ans</span>
            </div>
            <div className="spec">
              <span className="spec-label">Certifications</span>
              <span className="spec-value">CE, FDA, ISO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
