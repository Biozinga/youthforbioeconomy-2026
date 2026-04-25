/**
 * Composant BioConversion - Section éditoriale avec image de fond
 * Explique comment les biodéchets agricoles sont convertis en protéines par les larves
 */
export function BioConversion() {
  // Retourne une section immersive avec texte posé sur l'image de fond.
  return (
    // Section dédiée à la transformation biologique des déchets agricoles.
    <section className="bio-conversion">
      {/* Voile sombre qui garantit la lisibilité du texte sur l'image. */}
      <div className="bio-conversion-overlay">
        {/* Conteneur central qui limite la largeur du contenu textuel. */}
        <div className="container bio-conversion-content">
          {/* Petit libellé qui introduit le sujet de la section. */}
          <p className="bio-conversion-kicker">La biologie comme moteur industriel</p>
          {/* Titre principal de la section. */}
          <h2>Transformer l&apos;inutilisable en ressources agricoles</h2>
          {/* Texte explicatif sur le rôle des larves dans la revalorisation. */}
          <p>
            Les biodéchets agricoles peuvent être difficiles à valoriser directement par les
            élevages. Les larves jouent le rôle d&apos;intermédiaire biologique: elles métabolisent
            cette matière organique et la transforment en protéines utilisables pour nourrir des
            poules.
          </p>
          {/* Texte positionnant le vivant comme technologie avancée. */}
          <p>
            Nous nous appuyons sur la machinerie la plus avancée du monde: le vivant. Son code
            génétique orchestre une transformation que les poules ne pourraient pas faire seules,
            tout en créant une nouvelle valeur pour les agriculteurs.
          </p>
        </div>
      </div>
    </section>
  );
}
