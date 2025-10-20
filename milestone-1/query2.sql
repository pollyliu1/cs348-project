SELECT
    AdoptablePokemon.pid
    , AdoptablePokemon.pokedex_number
    , AdoptionLogs.action_type
    , AdoptionLogs.adopt_date

FROM AdoptablePokemon

JOIN AdoptionLogs
    ON AdoptablePokemon.pid = AdoptionLogs.pid

WHERE AdoptionLogs.action_type = 'adopt'
  AND DATEDIFF(CURRENT_DATE, AdoptionLogs.adopt_date) <= 30

ORDER BY AdoptionLogs.adopt_date DESC;
