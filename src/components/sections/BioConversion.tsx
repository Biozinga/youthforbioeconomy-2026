/**
 * Composant BioConversion - Section éditoriale avec image de fond
 * Explique comment les biodéchets agricoles sont convertis en protéines par les larves
 */
export function BioConversion() {
  // Retourne une section immersive avec texte posé sur l'image de fond.
  return (
    // Section dédiée à la transformation biologique des déchets agricoles.
    <section id="conversion" className="bio-conversion">
      {/* Voile sombre qui garantit la lisibilité du texte sur l'image. */}
      <div className="bio-conversion-overlay">
        {/* Conteneur central qui limite la largeur du contenu textuel. */}
        <div className="container bio-conversion-content">
          {/* Petit libellé qui introduit le sujet de la section. */}
          <p className="bio-conversion-kicker">La biologie comme moteur industriel</p>
          {/* Titre principal de la section. */}
          <h2>Le vivant comme technologie de transformation</h2>
          {/* Texte explicatif sur le rôle des larves dans la revalorisation. */}
          <p>
            Les coproduits végétaux sont broyés, humidifiés et préparés pour devenir un substrat que
            les insectes savent convertir avec une efficacité biologique remarquable.
          </p>
          {/* Texte positionnant le vivant comme technologie avancée. */}
          <p>
            Cette machinerie vivante, guidée par le code génétique, transforme une biomasse
            sous-exploitée en protéines pour volailles, réduit la dépendance au soja importé et
            referme la boucle avec un fertilisant organique restitué aux sols.
          </p>
        </div>
      </div>
    </section>
  );
}
