CREATE DATABASE IF NOT EXISTS pokemon;
USE pokemon;

DROP TABLE IF EXISTS Pokemon;

CREATE TABLE Pokemon (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  type VARCHAR(50)
);

INSERT INTO Pokemon VALUES
(1, 'Pikachu', 'Electric'),
(2, 'Charmander', 'Fire'),
(3, 'Squirtle', 'Water');
