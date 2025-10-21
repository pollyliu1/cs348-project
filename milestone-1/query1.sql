-- For example, search Pokémon with fire type and sort by base happiness descending

USE PokeAdopt;

SELECT
    pokedex_number
    , name

FROM Pokemon

WHERE type1 = 'Fire' OR type2 = 'Fire'

ORDER BY base_happiness DESC;
