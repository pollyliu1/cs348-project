CREATE DATABASE IF NOT EXISTS PokeAdopt;
USE PokeAdopt;

DROP TABLE IF EXISTS AdoptionLogs;
DROP TABLE IF EXISTS AdoptablePokemon;
DROP TABLE IF EXISTS Pokemon;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Adopter;
DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  uid INT NOT NULL PRIMARY KEY,
  username VARCHAR(30) NOT NULL CHECK(LENGTH(username) > 0),
  password VARCHAR(30) NOT NULL CHECK(LENGTH(password) >= 8),
  name VARCHAR(30) NOT NULL CHECK(LENGTH(name) > 0)
);

CREATE TABLE `Admin` (
  uid INT NOT NULL PRIMARY KEY REFERENCES `User`(uid)
);

CREATE TABLE `Adopter` (
  uid INT NOT NULL PRIMARY KEY REFERENCES `User`(uid)
);

CREATE TABLE `Pokemon` (
  pokedex_number INT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  type1 VARCHAR(30) NOT NULL,
  type2 VARCHAR(30),
  height FLOAT(4),
  weight FLOAT(4),
  generation INTEGER NOT NULL,
  is_legendary BOOLEAN NOT NULL,
  abilities VARCHAR(100) NOT NULL,
  base_happiness INTEGER NOT NULL,
  hp INTEGER NOT NULL,
  attack INTEGER NOT NULL,
  defense INTEGER NOT NULL,
  speed INTEGER NOT NULL
);

CREATE TABLE AdoptablePokemon (
  pid INT NOT NULL PRIMARY KEY,
  pokedex_number INT NOT NULL REFERENCES Pokemon(pokedex_number),
  nickname VARCHAR(30) NOT NULL,
  date_added DATE NOT NULL,
  description VARCHAR(100) NOT NULL,
  status ENUM('available', 'taken') NOT NULL,
  CONSTRAINT fk_adoptable_species
    FOREIGN KEY (pokedex_number) REFERENCES Pokemon(pokedex_number)
);

CREATE TABLE AdoptionLogs (
  log_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pokedex_number INT NOT NULL REFERENCES Pokemon(pokedex_number),
  pid INT NOT NULL,
  adopt_date DATE NOT NULL,
  action_type ENUM('adopt', 'unadopt'),
  CONSTRAINT fk_logs_species
    FOREIGN KEY (pokedex_number) REFERENCES Pokemon(pokedex_number),
  CONSTRAINT fk_logs_adoptable
    FOREIGN KEY (pid) REFERENCES AdoptablePokemon(pid)
);
