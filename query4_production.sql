-- basic feature 4: update an adoptable Pokemon's details
--      allows admins to modify Pokemon nickname and description

USE PokeAdopt;

UPDATE AdoptablePokemon

SET
  nickname = 'Fire'
  , description = 'Epic Charmander with a bright flame on its tail.'

WHERE pid = 2;
