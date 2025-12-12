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
