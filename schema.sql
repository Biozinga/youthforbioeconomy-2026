-- AGRICULTEUR
CREATE TABLE agriculteur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    telephone VARCHAR(20)
);

-- TERRAIN
CREATE TABLE terrain (
    id SERIAL PRIMARY KEY,
    agriculteur_id INT REFERENCES agriculteur(id) ON DELETE CASCADE,
    taille_hectares DECIMAL(5,2) CHECK (taille_hectares > 0)
);

-- CULTURE
CREATE TABLE culture (
    id SERIAL PRIMARY KEY,
    terrain_id INT REFERENCES terrain(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('mais', 'ble')),
    surface_utilisee DECIMAL(5,2) NOT NULL
);

-- DECHETS
CREATE TABLE dechet (
    id SERIAL PRIMARY KEY,
    culture_id INT REFERENCES culture(id) ON DELETE CASCADE,
    quantite_kg DECIMAL(10,2),
    date_production DATE DEFAULT CURRENT_DATE
);

-- PROPOSITION DE VENTE DE DECHETS
CREATE TABLE vente_dechet (
    id SERIAL PRIMARY KEY,
    dechet_id INT REFERENCES dechet(id),
    agriculteur_id INT REFERENCES agriculteur(id),
    prix DECIMAL(10,2),
    statut VARCHAR(20) CHECK (statut IN ('en_attente', 'accepte', 'refuse')) DEFAULT 'en_attente'
);

-- PRODUCTION DE LARVES
CREATE TABLE larve (
    id SERIAL PRIMARY KEY,
    dechet_id INT REFERENCES dechet(id),
    quantite DECIMAL(10,2),
    date_transformation DATE DEFAULT CURRENT_DATE
);

-- POULAILLER
CREATE TABLE poulailler (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    capacite INT
);

-- POULETS
CREATE TABLE poulet (
    id SERIAL PRIMARY KEY,
    poulailler_id INT REFERENCES poulailler(id),
    nombre INT
);

-- ALIMENTATION DES POULETS
CREATE TABLE alimentation (
    id SERIAL PRIMARY KEY,
    larve_id INT REFERENCES larve(id),
    poulailler_id INT REFERENCES poulailler(id),
    quantite DECIMAL(10,2),
    date DATE DEFAULT CURRENT_DATE
);

-- FIENTES
CREATE TABLE fiente (
    id SERIAL PRIMARY KEY,
    poulailler_id INT REFERENCES poulailler(id),
    quantite DECIMAL(10,2),
    date DATE DEFAULT CURRENT_DATE
);

-- ENGRAIS
CREATE TABLE engrais (
    id SERIAL PRIMARY KEY,
    fiente_id INT REFERENCES fiente(id),
    quantite DECIMAL(10,2),
    date_transformation DATE DEFAULT CURRENT_DATE
);

-- VENTE ENGRAIS
CREATE TABLE vente_engrais (
    id SERIAL PRIMARY KEY,
    engrais_id INT REFERENCES engrais(id),
    agriculteur_id INT REFERENCES agriculteur(id),
    prix DECIMAL(10,2)
);

-- ==============================================================================
-- LOGIQUE MÉTIER ET CONTRAINTES AVANCÉES
-- ==============================================================================

-- 1. Contrainte de taille de terrain (Max 10 hectares)
ALTER TABLE terrain 
ADD CONSTRAINT chk_terrain_max_10ha CHECK (taille_hectares <= 10);

-- 2. Trigger : Vérifier que la somme des cultures ne dépasse pas la taille du terrain
CREATE OR REPLACE FUNCTION check_surface_culture()
RETURNS TRIGGER AS $$
DECLARE
    total_surface DECIMAL(10,2);
    taille_max DECIMAL(10,2);
BEGIN
    -- Obtenir la taille totale du terrain
    SELECT taille_hectares INTO taille_max
    FROM terrain WHERE id = NEW.terrain_id;

    -- Calculer la surface déjà utilisée sur ce terrain (sans compter la culture actuelle si c'est un UPDATE)
    SELECT COALESCE(SUM(surface_utilisee), 0) INTO total_surface
    FROM culture
    WHERE terrain_id = NEW.terrain_id AND id != COALESCE(NEW.id, -1);

    -- Vérifier si l'ajout de la nouvelle surface dépasse la taille du terrain
    IF (total_surface + NEW.surface_utilisee) > taille_max THEN
        RAISE EXCEPTION 'La surface totale des cultures (% ha) ne peut pas dépasser la taille du terrain (% ha)', 
            (total_surface + NEW.surface_utilisee), taille_max;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_surface_culture
BEFORE INSERT OR UPDATE ON culture
FOR EACH ROW EXECUTE FUNCTION check_surface_culture();

-- Vue pour identifier les terrains dont les cultures couvrent exactement 100% de la surface
CREATE OR REPLACE VIEW vue_terrains_complets AS
SELECT t.id, t.agriculteur_id, t.taille_hectares, SUM(c.surface_utilisee) AS total_cultures
FROM terrain t
LEFT JOIN culture c ON t.id = c.terrain_id
GROUP BY t.id
HAVING SUM(c.surface_utilisee) = t.taille_hectares;


-- ==============================================================================
-- RATIOS DE CONVERSION
-- ==============================================================================

-- Table de paramétrage des ratios (permet de modifier les règles sans toucher au code)
CREATE TABLE ratio_conversion (
    id SERIAL PRIMARY KEY,
    etape_source VARCHAR(50),
    etape_cible VARCHAR(50),
    sous_type VARCHAR(50), -- Exemple : 'mais', 'ble', ou NULL
    multiplicateur DECIMAL(10,2) NOT NULL,
    description VARCHAR(255)
);

-- Insertion de quelques ratios d'exemple
INSERT INTO ratio_conversion (etape_source, etape_cible, sous_type, multiplicateur, description) VALUES
('culture', 'dechet', 'mais', 5000.00, '1 hectare de maïs produit 5000 kg de déchets'),
('culture', 'dechet', 'ble', 3500.00, '1 hectare de blé produit 3500 kg de déchets'),
('dechet', 'larve', NULL, 0.15, '1 kg de déchet permet de produire 0.15 kg de larves'),
('larve', 'poulet_croissance', NULL, 0.80, '1 kg de larves nourrit X poulets (ratio à ajuster)'),
('poulet', 'fiente', NULL, 1.50, '1 poulet produit 1.5 kg de fientes'),
('fiente', 'engrais', NULL, 0.60, '1 kg de fientes se transforme en 0.6 kg d''engrais utilisable');


-- ==============================================================================
-- FONCTIONS UTILITAIRES (Pour automatiser ou aider les calculs métier)
-- ==============================================================================

-- Fonction : Calculer automatiquement les déchets générés par une culture
CREATE OR REPLACE FUNCTION estimer_dechets_culture(p_culture_id INT)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_surface DECIMAL(10,2);
    v_type VARCHAR(50);
    v_ratio DECIMAL(10,2);
BEGIN
    SELECT surface_utilisee, type INTO v_surface, v_type
    FROM culture WHERE id = p_culture_id;

    SELECT multiplicateur INTO v_ratio
    FROM ratio_conversion 
    WHERE etape_source = 'culture' AND etape_cible = 'dechet' AND sous_type = v_type;

    RETURN v_surface * COALESCE(v_ratio, 0);
END;
$$ LANGUAGE plpgsql;

-- Fonction : Estimer la quantité de larves produites à partir d'un lot de déchets
CREATE OR REPLACE FUNCTION estimer_production_larves(p_quantite_dechets_kg DECIMAL(10,2))
RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_ratio DECIMAL(10,2);
BEGIN
    SELECT multiplicateur INTO v_ratio
    FROM ratio_conversion 
    WHERE etape_source = 'dechet' AND etape_cible = 'larve' LIMIT 1;

    RETURN p_quantite_dechets_kg * COALESCE(v_ratio, 0);
END;
$$ LANGUAGE plpgsql;
