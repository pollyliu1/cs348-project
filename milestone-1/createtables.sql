CREATE TABLE User
(uid INT NOT NULL PRIMARY KEY,
username VARCHAR(30) NOT NULL CHECK(LENGTH(username) > 0),
password VARCHAR(30) NOT NULL CHECK(LENGTH(password) >= 8),
name VARCHAR(30) NOT NULL CHECK,
);

CREATE TABLE Admin
(uid INT NOT NULL PRIMARY KEY REFERENCES User(uid)
);

CREATE TABLE Adopter
(uid INT NOT NULL PRIMARY KEY REFERENCES User(uid)
);

CREATE TABLE Pokemon
(pokedex_number INT NOT NULL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
type1 VARCHAR(30) NOT NULL,
type2 VARCHAR(30),
height FLOAT(4),
weight FLOAT(4),
generation INTEGER NOT NULL,
is_legendary BOOLEAN NOT NULL,
abilities VARCHAR(100) NOT NULL,
base_hapiness INTEGER NOT NULL,
hp INTEGER NOT NULL,
attack INTEGER NOT NULL,
defense INTEGER NOT NULL,
speed INTEGER NOT NULL,
);

CREATE TABLE AdoptablePokemon
(pid INT NOT NULL PRIMARY KEY,
pokedex_number INT NOT NULL REFERENCES Pokemon(pokedex_number),
nickname VARCHAR(30) NOT NULL,
date_added DATE NOT NULL,
description VARCHAR(100) NOT NULL,
status ENUM('available', 'taken') NOT NULL,
);

CREATE TABLE AdoptionLogs
(log_id INT NOT NULL AUTO_INCREMENT
pokedex_number INT NOT NULL REFERENCES Pokemon(pokedex_number),
adopt_id INT NOT NULL REFERENCES AdoptablePokemon(adopt_id),
adopt_date DATE NOT NULL,
action_type ENUM('adopt', 'unadopt'),
);
