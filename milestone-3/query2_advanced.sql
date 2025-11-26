-- advanced query 2: full text search with relevance ranking, based on Pokemon attributes such as
--      names and types and AdoptablePokemon attributes such as description

-- relevance scoring:
--   +50 points for exact match in Pokemon name
--   +30 points for partial match in Pokemon name
--   +20 points for match in type1
--   +15 points for match in type2
--   +25 points for match in AdoptablePokemon nickname
--   +40 points for match in AdoptablePokemon description
--   +10 points for match in abilities

SELECT 
    Pokemon.pokedex_number
    , Pokemon.name
    , AdoptablePokemon.nickname
    , Pokemon.type1
    , Pokemon.type2
    , AdoptablePokemon.description
    , Pokemon.abilities
    , AdoptablePokemon.status
    , (
        -- Exact match in Pokemon name
        CASE WHEN LOWER(Pokemon.name) = LOWER('water')
            THEN 50 ELSE 0 END
        -- Partial match in Pokemon name
        + CASE WHEN LOWER(Pokemon.name) LIKE LOWER('%water%') AND LOWER(Pokemon.name) != LOWER('water')
            THEN 30 ELSE 0 END
        -- Match in type1
        + CASE WHEN LOWER(Pokemon.type1) LIKE LOWER('%water%')
            THEN 20 ELSE 0 END
        -- Match in type2
        + CASE WHEN Pokemon.type2 IS NOT NULL AND LOWER(Pokemon.type2) LIKE LOWER('%water%')
            THEN 15 ELSE 0 END
        -- Match in AdoptablePokemon nickname
        + CASE WHEN AdoptablePokemon.nickname IS NOT NULL AND LOWER(AdoptablePokemon.nickname) LIKE LOWER('%water%')
            THEN 25 ELSE 0 END
        -- Match in AdoptablePokemon description
        + CASE WHEN AdoptablePokemon.description IS NOT NULL AND LOWER(AdoptablePokemon.description) LIKE LOWER('%water%')
            THEN 40 ELSE 0 END
        -- Match in abilities
        + CASE WHEN LOWER(Pokemon.abilities) LIKE LOWER('%water%')
            THEN 10 ELSE 0 END
    ) AS relevance_score

FROM Pokemon

LEFT OUTER JOIN AdoptablePokemon
    ON Pokemon.pokedex_number = AdoptablePokemon.pokedex_number

WHERE (
    LOWER(Pokemon.name) LIKE LOWER('%water%')
    OR LOWER(Pokemon.type1) LIKE LOWER('%water%')
    OR LOWER(Pokemon.type2) LIKE LOWER('%water%')
    OR LOWER(AdoptablePokemon.nickname) LIKE LOWER('%water%')
    OR LOWER(AdoptablePokemon.description) LIKE LOWER('%water%')
    OR LOWER(Pokemon.abilities) LIKE LOWER('%water%')
)

ORDER BY relevance_score DESC

LIMIT 50;
