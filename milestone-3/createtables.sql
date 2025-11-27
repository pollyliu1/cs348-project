CREATE DATABASE IF NOT EXISTS PokeAdopt;
USE PokeAdopt;

DROP TABLE IF EXISTS AdoptionLogs;
DROP TABLE IF EXISTS AdoptablePokemon;
DROP TABLE IF EXISTS Pokemon;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Adopter;
DROP TABLE IF EXISTS User;
DROP VIEW IF EXISTS AdoptablePokemonView;
DROP PROCEDURE IF EXISTS CreateAdopter;
DROP PROCEDURE IF EXISTS CheckUser;
DROP PROCEDURE IF EXISTS UpdateAdopterPreferences;

CREATE TABLE User (
    uid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL CHECK(LENGTH(username) > 0) UNIQUE,
    password CHAR(32) NOT NULL,
    name VARCHAR(30) NOT NULL CHECK(LENGTH(name) > 0)
);

CREATE TABLE Admin (
    uid INT NOT NULL PRIMARY KEY REFERENCES User(uid)
);

CREATE TABLE Adopter (
    uid INT NOT NULL PRIMARY KEY REFERENCES User(uid),
    pref_abilities VARCHAR(100) NOT NULL CHECK(LENGTH(pref_abilities) > 0),
    pref_types VARCHAR(100) NOT NULL CHECK(LENGTH(pref_types) > 0)
);

CREATE TABLE Pokemon (
    pokedex_number INT NOT NULL PRIMARY KEY CHECK(pokedex_number >= 0),
    name VARCHAR(30) NOT NULL CHECK(LENGTH(name) > 0),
    type1 VARCHAR(30) NOT NULL CHECK(LENGTH(type1) > 0),
    type2 VARCHAR(30),
    classification VARCHAR(30) CHECK(LENGTH(classification) > 0),
    height FLOAT(4) CHECK(height IS NULL OR height > 0),
    weight FLOAT(4) CHECK(weight IS NULL OR weight > 0),
    generation INT NOT NULL CHECK(generation > 0),
    is_legendary BOOLEAN NOT NULL,
    abilities VARCHAR(100) NOT NULL CHECK(LENGTH(abilities) > 0),
    base_happiness INT NOT NULL CHECK(base_happiness >= 0),
    hp INT NOT NULL CHECK(hp > 0),
    attack INT NOT NULL CHECK(attack > 0),
    defense INT NOT NULL CHECK(defense > 0),
    speed INT NOT NULL CHECK(speed > 0)
);

CREATE TABLE AdoptablePokemon (
    pid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pokedex_number INT NOT NULL REFERENCES Pokemon(pokedex_number),
    nickname VARCHAR(30) NOT NULL CHECK(LENGTH(nickname) > 0),
    date_added DATE NOT NULL,
    description VARCHAR(100) NOT NULL,
    status ENUM('available', 'taken') NOT NULL
);

CREATE TABLE AdoptionLogs (
    log_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid INT NOT NULL REFERENCES Adopter(uid),
    pid INT NOT NULL REFERENCES AdoptablePokemon(pid),
    log_date DATE NOT NULL,
    action_type ENUM('adopt', 'unadopt') NOT NULL
);

-- Query 1: filter Pokemon by type + sort by base happiness
CREATE INDEX idx_pokemon_type1
ON Pokemon(type1);

CREATE INDEX idx_pokemon_type2
ON Pokemon(type2);

CREATE INDEX idx_pokemon_base_happiness
ON Pokemon(base_happiness);

-- Query 2: recent adoptions
CREATE INDEX idx_adoptionlogs_log_date
ON AdoptionLogs(log_date);

CREATE INDEX idx_adoptionlogs_pid
ON AdoptionLogs(pid);

CREATE INDEX idx_adoptionlogs_uid
ON AdoptionLogs(uid);

-- Query 3: insert only -> no index needed

-- Query 4: update by pid -> primary key index already exists, don't need extra index

-- Query 5: top pokemon by adoption count query
CREATE INDEX idx_adoptablepokemon_pokedex
ON AdoptablePokemon(pokedex_number);

-- View for adoptable Pokemon with full details
CREATE VIEW AdoptablePokemonView AS
SELECT 
    ap.pid,
    ap.pokedex_number,
    ap.nickname,
    ap.date_added,
    ap.description,
    ap.status,
    p.name,
    p.type1,
    p.type2,
    p.classification,
    p.height,
    p.weight,
    p.generation,
    p.is_legendary,
    p.abilities,
    p.base_happiness,
    p.hp,
    p.attack,
    p.defense,
    p.speed
FROM AdoptablePokemon ap
JOIN Pokemon p ON ap.pokedex_number = p.pokedex_number;

-- Stored Procedures
DELIMITER //

-- CreateAdopter: Creates a new adopter account
CREATE PROCEDURE CreateAdopter(
    IN p_name VARCHAR(30),
    IN p_username VARCHAR(30),
    IN p_password CHAR(32)
)
BEGIN
    DECLARE new_uid INT;
    
    -- Insert into User table
    INSERT INTO User (username, password, name)
    VALUES (p_username, p_password, p_name);
    
    -- Get the newly created user ID
    SET new_uid = LAST_INSERT_ID();
    
    -- Insert into Adopter table with default empty preferences
    INSERT INTO Adopter (uid, pref_abilities, pref_types)
    VALUES (new_uid, '[]', '[]');
END //

-- CheckUser: Validates user credentials and returns user info
CREATE PROCEDURE CheckUser(
    IN p_username VARCHAR(30),
    IN p_password CHAR(32)
)
BEGIN
    SELECT uid, name
    FROM User
    WHERE username = p_username AND password = p_password;
END //

-- UpdateAdopterPreferences: Updates adopter's preferences
CREATE PROCEDURE UpdateAdopterPreferences(
    IN p_uid INT,
    IN p_pref_abilities VARCHAR(100),
    IN p_pref_types VARCHAR(100)
)
BEGIN
    UPDATE Adopter
    SET pref_abilities = p_pref_abilities,
        pref_types = p_pref_types
    WHERE uid = p_uid;
END //

DELIMITER ;