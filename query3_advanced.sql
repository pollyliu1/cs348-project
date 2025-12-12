-- advanced query 3: auto update Pokemon status based on log addition
USE PokeAdopt;

DROP TRIGGER IF EXISTS prevent_delete_adopted_pokemon;
DROP TRIGGER IF EXISTS delete_adoption_logs_pokemon;
DROP TRIGGER IF EXISTS delete_adoption_logs_adopter;
DROP TRIGGER IF EXISTS after_adopt;
DROP TRIGGER IF EXISTS after_unadopt;

-- change terminator from ; to $$
DELIMITER $$

CREATE TRIGGER after_adopt
AFTER INSERT ON AdoptionLogs
FOR EACH ROW
BEGIN
    UPDATE AdoptablePokemon
    SET status = 'taken'
    WHERE pid = NEW.pid
      AND NEW.action_type = 'adopt';
END$$

CREATE TRIGGER after_unadopt
AFTER INSERT ON AdoptionLogs
FOR EACH ROW
BEGIN
    UPDATE AdoptablePokemon
    SET status = 'available'
    WHERE pid = NEW.pid
      AND NEW.action_type = 'unadopt';
END$$

-- change back
DELIMITER ;
