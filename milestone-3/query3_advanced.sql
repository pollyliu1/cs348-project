-- advanced query 3: trigger to prevent deleting Pokemon if adopted (uses BEFORE trigger)

-- change terminator from ; to $$
DELIMITER $$

CREATE TRIGGER prevent_delete_adopted_pokemon
BEFORE DELETE ON AdoptablePokemon
FOR EACH ROW
BEGIN
    IF OLD.status = 'taken' THEN
        -- unhandled user defined exception
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete adopted Pokemon. Please unadopt the Pokemon first.';
    END IF;
END$$

-- change back
DELIMITER ;
