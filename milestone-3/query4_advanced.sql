-- advanced feature 4: view for a commonly used subquery
-- (all available and already adopted Pokemon with their details)
USE PokeAdopt;

CREATE VIEW AdoptablePokemonView AS
SELECT 
    AdoptablePokemon.pid AS pid
    , AdoptablePokemon.nickname AS nickname
    , Pokemon.name AS name
    , AdoptablePokemon.description AS description
    , AdoptablePokemon.status AS status
    , AdoptablePokemon.date_added AS date_added
FROM AdoptablePokemon

INNER JOIN Pokemon
    ON AdoptablePokemon.pokedex_number = Pokemon.pokedex_number;
