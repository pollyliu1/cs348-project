-- basic feature 5: view most popular Pokemon species by adoption count
--      shows which Pokemon species are most frequently adopted to identify trends

USE PokeAdopt;

SELECT
    Pokemon.pokedex_number
    , Pokemon.name
    , COUNT(AdoptionLogs.pid) AS total_adoptions

FROM AdoptionLogs

INNER JOIN AdoptablePokemon
    ON AdoptionLogs.pid = AdoptablePokemon.pid

INNER JOIN Pokemon
    ON AdoptablePokemon.pokedex_number = Pokemon.pokedex_number

WHERE AdoptionLogs.action_type = 'adopt'

GROUP BY 1, 2

ORDER BY total_adoptions DESC;
