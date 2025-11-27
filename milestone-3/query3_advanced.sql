-- advanced query 3: trigger to prevent deleting Pokemon if adopted (uses BEFORE trigger)
USE PokeAdopt;

DROP TRIGGER IF EXISTS prevent_delete_adopted_pokemon;
DROP TRIGGER IF EXISTS delete_adoption_logs_pokemon;
DROP TRIGGER IF EXISTS delete_adoption_logs_adopter;

-- change terminator from ; to $$
DELIMITER $$

CREATE TRIGGER delete_adoption_logs_pokemon
AFTER DELETE ON AdoptablePokemon
FOR EACH ROW
BEGIN
    DELETE FROM AdoptionLogs
    WHERE pid = OLD.pid;
END$$

CREATE TRIGGER delete_adoption_logs_adopter
AFTER DELETE ON Adopter
FOR EACH ROW
BEGIN
    DELETE FROM AdoptionLogs
    WHERE uid = OLD.uid;
END$$

-- change back
DELIMITER ;
