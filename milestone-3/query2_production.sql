-- basic feature 2: view recent adoptions within the last 30 days
--      displays adoption history to show which Pokemon were recently adopted

USE PokeAdopt;

SELECT
    AdoptablePokemon.pid
    , AdoptablePokemon.pokedex_number
    , AdoptionLogs.action_type
    , AdoptionLogs.log_date

FROM AdoptablePokemon

JOIN AdoptionLogs
    ON AdoptablePokemon.pid = AdoptionLogs.pid

WHERE AdoptionLogs.action_type = 'adopt'
  AND DATEDIFF(CURRENT_DATE, AdoptionLogs.log_date) <= 30

ORDER BY AdoptionLogs.log_date DESC;
