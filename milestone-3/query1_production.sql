-- basic feature 1: search Pokemon by type and sort by base happiness
--      allows users to find Pokemon of a specific type ordered by how friendly they are

USE PokeAdopt;

SELECT
    pokedex_number
    , name

FROM Pokemon

WHERE type1 = 'Fire' OR type2 = 'Fire'

ORDER BY base_happiness DESC;
