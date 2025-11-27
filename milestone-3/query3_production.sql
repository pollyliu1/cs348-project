-- basic feature 3: add a new Pokemon to the adoption center
--      allows admins to make new Pokemon available for adoption

USE PokeAdopt;

INSERT INTO AdoptablePokemon (
    pid
    , pokedex_number
    , nickname
    , date_added
    , description
    , status
)
VALUES (
    161
    , 498
    , 'Fire Pig'
    , CURRENT_DATE
    , 'A lit Pokabu who loves fire.'
    , 'available'
);
