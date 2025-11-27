-- advanced feature 5: stored procedures for user authentication and adopter profile management
-- CreateAdopter: registers a new user and creates their adopter profile with default empty preferences
-- CheckUser: validates user login credentials using hashed password
-- UpdateAdopterPreferences: updates an adopter's preferred Pokemon abilities and types after authentication

USE PokeAdopt;

DROP PROCEDURE IF EXISTS CreateAdopter;
DROP PROCEDURE IF EXISTS CheckUser;
DROP PROCEDURE IF EXISTS UpdateAdopterPreferences;

DELIMITER $$

CREATE PROCEDURE CreateAdopter(IN _name VARCHAR(30), IN _username VARCHAR(30), IN _password VARCHAR(30))
BEGIN
    INSERT INTO User (name, username, password)
	VALUES (_name, _username, MD5(_password));

	INSERT INTO Adopter (uid, pref_abilities, pref_types)
	VALUES ((SELECT uid FROM User WHERE username = _username), '[]', '[]');
END$$

CREATE PROCEDURE CheckUser(IN _username VARCHAR(30), IN _password VARCHAR(30))
BEGIN
    SELECT * FROM User WHERE username = _username AND password = MD5(_password);
END$$

CREATE PROCEDURE UpdateAdopterPreferences(
	IN _uid INT,
	IN _pref_abilities VARCHAR(100),
	IN _pref_types VARCHAR(100)
)
BEGIN
    UPDATE Adopter
	SET pref_abilities = _pref_abilities, pref_types = _pref_types
	WHERE uid = _uid;
END$$

DELIMITER ;