-- advanced query 1: wiki page that lets user sort Pokemon based on compatibility score
--      between user and Pokemon (based on preferred types and abilities of the user)

-- score calculation:
--   +10 points if type1 matches any of user's preferred types
--   +5 points if type2 matches any of user's preferred types
--   +15 points if any ability matches user's preferred abilities
-- higher score = better compatibility

SELECT
    AdoptablePokemon.pid AS pid
    , AdoptablePokemon.nickname AS nickname
    , Pokemon.name AS name
    , AdoptablePokemon.description AS description
    , AdoptablePokemon.status AS status
    , AdoptablePokemon.date_added AS date_added
    , (
        -- Check if type1 is in user's preferred types (+10 points)
        CASE WHEN JSON_CONTAINS(
            LOWER(Adopter.pref_types), 
            JSON_QUOTE(LOWER(Pokemon.type1))
        ) THEN 10 ELSE 0 END
        -- Check if type2 is in user's preferred types (+5 points)
        + CASE WHEN JSON_CONTAINS(
            LOWER(Adopter.pref_types), 
            JSON_QUOTE(LOWER(Pokemon.type2))
        ) THEN 5 ELSE 0 END
        -- Check if any Pokemon ability matches user preferences (+15 points)
        + CASE WHEN EXISTS (
            SELECT 1
            FROM JSON_TABLE(Adopter.pref_abilities, '$[*]' COLUMNS(ability VARCHAR(100) PATH '$')) AS user_prefs
            WHERE REPLACE(REPLACE(Pokemon.abilities, '[', ''), ']', '') LIKE CONCAT('%', user_prefs.ability, '%')
        ) THEN 15 ELSE 0 END
    ) AS compatibility_score

FROM AdoptablePokemon

INNER JOIN Pokemon
    ON AdoptablePokemon.pokedex_number = Pokemon.pokedex_number

CROSS JOIN Adopter

WHERE Adopter.uid = 205
    AND AdoptablePokemon.nickname LIKE '%horn%'

ORDER BY compatibility_score DESC;