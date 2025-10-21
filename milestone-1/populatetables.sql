USE PokeAdopt;

LOAD DATA LOCAL INFILE './pokemon.csv'
INTO TABLE Pokemon
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES (
	@abilities, @against_bug, @against_dark, @against_dragon, @against_electric, @against_fairy, @against_fight,
	@against_fire, @against_flying, @against_ghost, @against_grass, @against_ground, @against_ice,
	@against_normal, @against_poison, @against_psychic, @against_rock, @against_steel, @against_water,
	@attack, @base_egg_steps, @base_happiness, @base_total, @capture_rate, @classification, @defense,
	@experience_growth, @height_m, @hp, @japanese_name, @name, @percentage_male, @pokedex_number,
	@sp_attack, @sp_defense, @speed, @type1, @type2, @weight_kg, @generation, @is_legendary
)
SET
	pokedex_number = @pokedex_number,
	name = @name,
	type1 = @type1,
	type2 = NULLIF(@type2, ''),
	height = NULLIF(@height_m, ''),
	weight = NULLIF(@weight_kg, ''),
	generation = NULLIF(@generation, ''),
	is_legendary = NULLIF(@is_legendary, ''),
	abilities = @abilities,
	base_happiness = NULLIF(@base_happiness, ''),
	hp = NULLIF(@hp, ''),
	attack = NULLIF(@attack, ''),
	defense = NULLIF(@defense, ''),
	speed = NULLIF(@speed, '');

INSERT INTO User (uid, username, password, name)
VALUES
	(1, 'leaflover', 'bulba1234', 'Ash Leaf'),
	(4, 'firefang', 'char1234', 'Blaze Ember'),
	(7, 'watersplash', 'squirt1234', 'Marina Wave'),
	(10, 'darkhowl', 'hound1234', 'Luna Shade'),
	(12, 'buzzwing', 'butter1234', 'Bea Flutter'),
	(18, 'skyeye', 'pidge1234', 'Aero Feather'),
	(25, 'sparkplug', 'pika1234', 'Sparky Volt'),
	(39, 'singsoftly', 'jiggly1234', 'Melody Puff'),
	(133, 'evolveit', 'eevee1234', 'Evan Morph'),
	(150, 'mindstorm', 'mewtwo1234', 'Mew Two'),
	(151, 'floatdream', 'mew12345', 'Mia Dream'),
	(200, 'adminmaster', 'rootpass1234', 'Professor Oak'),
	(201, 'guestuser', 'guestpass1234', 'Tracey Sketchit');

INSERT INTO Admin (uid)
VALUES
	(200),
	(201);

INSERT INTO Adopter (uid, pref_abilities, pref_types)
VALUES
	(1, '["Overgrow","Chlorophyll"]', '["Grass","Poison"]'),
	(4, '["Blaze","Solar Power"]', '["Fire"]'),
	(7, '["Torrent","Rain Dish"]', '["Water"]'),
	(10, '["Intimidate","Moxie"]', '["Dark"]'),
	(12, '["Compound Eyes","Tinted Lens"]', '["Bug","Flying"]'),
	(18, '["Keen Eye","Tangled Feet"]', '["Normal","Flying"]'),
	(25, '["Static","Lightning Rod"]', '["Electric"]'),
	(39, '["Cute Charm","Friend Guard"]', '["Normal","Fairy"]'),
	(133, '["Run Away","Adaptability","Anticipation"]', '["Normal"]'),
	(150, '["Pressure","Unnerve"]', '["Psychic"]'),
	(151, '["Synchronize"]', '["Psychic"]');

INSERT INTO AdoptablePokemon (pid, pokedex_number, nickname, date_added, description, status)
VALUES
	(1, 1, 'Leafy', '2025-10-10', 'A cheerful Bulbasaur that loves sunshine.', 'available'),
	(2, 4, 'Flare', '2025-09-28', 'Playful Charmander with a bright flame on its tail.', 'taken'),
	(3, 7, 'Shellby', '2025-10-01', 'A calm Squirtle who enjoys splashing in the water.', 'available'),
	(4, 25, 'Spark', '2025-09-15', 'An energetic Pikachu who loves company.', 'available'),
	(5, 39, 'Lulla', '2025-08-20', 'A gentle Jigglypuff who sings sweet lullabies.', 'taken'),
	(6, 133, 'Eeveeon', '2025-10-05', 'Curious and adaptable Eevee with a big heart.', 'available'),
	(7, 37, 'Ember', '2025-09-12', 'Vulpix with six fiery tails and a friendly nature.', 'available'),
	(8, 52, 'Whiskers', '2025-09-30', 'Mischievous Meowth that loves shiny objects.', 'available'),
	(9, 150, 'MewtwoX', '2025-07-01', 'Powerful and mysterious Pokémon seeking a calm home.', 'taken'),
	(10, 151, 'Mewmie', '2025-10-14', 'Playful and rare Mew who loves to float around.', 'available');

INSERT INTO AdoptionLogs (log_id, uid, pid, log_date, action_type)
VALUES
	(1, 1, 1, '2025-10-15', 'adopt'),
	(2, 4, 2, '2025-09-29', 'adopt'),
	(3, 4, 2, '2025-10-10', 'unadopt'),
	(4, 7, 3, '2025-10-02', 'adopt'),
	(5, 25, 4, '2025-09-16', 'adopt'),
	(6, 39, 5, '2025-08-21', 'adopt'),
	(7, 39, 5, '2025-09-10', 'unadopt'),
	(8, 133, 6, '2025-10-07', 'adopt'),
	(9, 150, 9, '2025-07-03', 'adopt'),
	(10, 151, 10, '2025-10-15', 'adopt');