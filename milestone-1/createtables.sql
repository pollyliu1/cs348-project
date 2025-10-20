CREATE TABLE User
(uid INT NOT NULL PRIMARY KEY,
username VARCHAR(30) NOT NULL CHECK(LENGTH(username) > 0),
password VARCHAR(30) NOT NULL,
name VARCHAR(30) NOT NULL,
role VARCHAR(10) NOT NULL
);

CREATE TABLE Pokemon
(pokedex_number INT NOT NULL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
type1 VARCHAR(30) NOT NULL,
type2 VARCHAR(30),
height FLOAT(4),
weight FLOAT(4),
abilities VARCHAR(250) NOT NULL,
base_hapiness INTEGER NOT NULL,
hp INTEGER NOT NULL,
attack INTEGER NOT NULL,
defense INTEGER NOT NULL,
speed INTEGER NOT NULL,
generation INTEGER NOT NULL,
is_legendary BOOLEAN NOT NULL,
);

CREATE TABLE AdoptablePokemon
(adopt_id INT NOT NULL PRIMARY KEY,
pokedex_number INT NOT NULL REFERENCES Pokemon(pokedex_number),
nickname VARCHAR(30) NOT NULL,
add_date DATE NOT NULL,
);

CREATE TABLE AdoptRecord
(pokedex_number INT NOT NULL REFERENCES Pokemon(pokedex_number),
adopt_id INT NOT NULL REFERENCES AdoptablePokemon(adopt_id),
old_nickname VARCHAR(30) NOT NULL,
new_nickname VARCHAR(30) NOT NULL,
adopt_date DATE NOT NULL,
PRIMARY KEY(pokedex_number, adopt_id)
);
