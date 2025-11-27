import mysql.connector
from flask import Flask, jsonify, send_from_directory, request

app = Flask(__name__)

def run_query(query, parameters=(), procedure=False):
	connection = mysql.connector.connect(
		host="localhost",
		user="root",
		password="",
		database="PokeAdopt"
	)

	cursor = connection.cursor()

	if procedure:
		cursor.callproc(query, parameters)
		results = list(cursor.stored_results())
		if len(results) > 0:
			description = results[0].description
			ret = results[0].fetchall()
		else:
			description = ret = None
	else:
		cursor.execute(query, parameters)
		description = cursor.description
		ret = cursor.fetchall()

	if not description:
		connection.commit()
		cursor.close()
		connection.close()
		return

	col_names = [x[0] for x in description]
	data = []

	for row in ret:
		data.append(dict(zip(col_names, row)))

	cursor.close()
	connection.close()

	return data

@app.route("/")
def index():
	return send_from_directory("frontend/dist/", "index.html")

@app.route("/<to>")
def index2(to):
	return send_from_directory("frontend/dist/", "index.html")

@app.route("/assets/<file>")
def assets(file):
	return send_from_directory("frontend/dist/assets/", file)
	
@app.route("/fonts/<file>")
def fonts(file):
	return send_from_directory("frontend/dist/fonts", file)

@app.route("/api/search-pokemon")
def get_pokemon():
	name = request.args.get("name", "")
	types = request.args.getlist("type")
	order = request.args.get("order", "")
	typelist = f"({", ".join(map(lambda s: "%s", types))})"

	query = f"SELECT * FROM Pokemon WHERE name LIKE %s AND (type1 in {typelist} OR type2 IN {typelist})"
	if order == "asc":
		query += " ORDER BY base_happiness ASC"
	elif order == "desc":
		query += " ORDER BY base_happiness DESC"
	query += ";"

	return run_query(query, (f"%{name}%",) + tuple(types) + tuple(types))

@app.route("/api/validate-pokemon")
def validate_pokemon():
	name = request.args.get("name", "")
	q = run_query("SELECT count(*) > 0 FROM Pokemon WHERE name = %s;", (name,))
	return jsonify(list(q[0].values())[0])

@app.route("/api/adoptable-pokemon")
def adoptable_pokemon():
	return jsonify(
		run_query("SELECT * FROM AdoptablePokemonView;")
	)

@app.route("/api/adopt-pokemon/<int:pid>/<int:uid>", methods=["PUT"])
def adopt_pokemon(pid, uid):
	run_query("INSERT INTO AdoptionLogs (uid, pid, log_date, action_type) " +
			  "VALUES (%s, %s, CURDATE(), 'adopt');", (uid, pid))
	run_query("UPDATE AdoptablePokemon SET status = 'taken' WHERE pid = %s;", (pid,))
	return jsonify({"success": True}), 200

@app.route("/api/update-pokemon/<int:pid>", methods=["PUT"])
def update_pokemon(pid):
	data = request.json
	nickname = data.get("nickname", "")
	name = data.get("name", "")
	description = data.get("description", "")
	print(data)
	print(pid, nickname, name, description)
	try:
		run_query(
			"UPDATE AdoptablePokemon SET nickname = %s, pokedex_number = " +
			"(SELECT pokedex_number FROM Pokemon WHERE name = %s), description = %s WHERE pid = %s;",
			(nickname, name, description, pid)
		)
		return jsonify({"success": True}), 200
	except Exception as e:
		print("error is: ", e)
		return jsonify({"error": "Invalid Pokemon name"}), 400

@app.route("/api/add-pokemon", methods=["POST"])
def add_pokemon():
	data = request.json
	nickname = data.get("nickname", "")
	name = data.get("name", "")
	description = data.get("description", "")
	try:
		run_query(
			"INSERT INTO AdoptablePokemon (pokedex_number, nickname, date_added, description, status) " +
			"VALUES ((SELECT pokedex_number FROM Pokemon WHERE name = %s), %s, CURDATE(), %s, 'available');",
			(name, nickname, description)
		)
		
		return jsonify({"success": True}), 201
	except:
		return jsonify({"error": "Invalid Pokemon name"}), 400
	return ""

@app.route("/api/create-account", methods=["POST"])
def create_account():
	data = request.json
	name = data.get("name", "")
	username = data.get("username", "")
	password = data.get("password", "")
	try:
		run_query("CreateAdopter", (name, username, password), True)

		return jsonify({
			"pref_types": "[]",
			"pref_abilities": "[]",
			"uid": run_query("SELECT uid FROM User WHERE username = %s;", (username,))[0]["uid"],
			"name": name,
			"role": "adopter"
		})
	except Exception as e:
		print(e)
		return jsonify({"error": "Invalid username or password"}), 400

@app.route("/api/login", methods=["POST"])
def login():
	data = request.json
	username = data.get("username", "")
	password = data.get("password", "")
	try:
		res = run_query("CheckUser", (username, password), True)
		print("here")

		if len(res) == 0:
			return jsonify({"error": "Invalid username or password"}), 400

		uid = res[0]["uid"]
		res2 = run_query("SELECT * FROM Adopter WHERE uid = %s", (uid,))
		types = None if len(res2) == 0 else res2[0]["pref_types"]
		abilities = None if len(res2) == 0 else res2[0]["pref_abilities"]

		return jsonify({
			"pref_types": types,
			"pref_abilities": abilities,
			"uid": uid,
			"name": res[0]["name"],
			"role": "admin" if len(res2) == 0 else "adopter"
		})
	except Exception as e:
		print(e)
		return jsonify({"error": "Invalid username or password"}), 400

@app.route("/api/search-adoptable-pokemon")
def search_adoptable_pokemon():
	name = request.args.get("name", "").lower()
	order = request.args.get("order", "relevance")
	uid = request.args.get("uid", "")
	showAll = bool(request.args.get("all", "true") == "true")

	if order == "relevance":
		with open("./query2_advanced.sql", "r") as f:
			contents = f.read()
			count = contents.count("water")
			query = contents.replace("'%water%'", "%s").replace("'water'", "%s")
		ans = run_query(query, (name, f"%{name}%", name) + (f"%{name}%",) * (count - 3))
	else:
		with open("./query1_advanced.sql", "r") as f:
			query = f.read().replace("205", "%s").replace("'%horn%'", "%s")
		ans = run_query(query, (uid, f"%{name}%"))
	
	if showAll:
		return ans
	else:
		mine = run_query(
			"""
			SELECT al.pid AS pid
			FROM AdoptionLogs al
			JOIN (
				SELECT pid, MAX(log_id) AS latest_log
				FROM AdoptionLogs
				WHERE uid = %s
				GROUP BY pid
			) AS latest
				ON al.pid = latest.pid
			AND al.log_id = latest.latest_log
			WHERE al.uid = %s
			AND al.action_type = 'adopt';
		""", (uid, uid))

		mine = set(map(lambda row: row["pid"], mine))
		return list(filter(lambda row: row["pid"] in mine, ans))
	

@app.route("/api/recently-adopted")
def recently_adopted():
	return run_query(
		"""
		SELECT Pokemon.name AS name, nickname, User.name as adopter, log_date as date
		FROM AdoptionLogs
		JOIN User ON User.uid = AdoptionLogs.uid
		JOIN AdoptablePokemon ON AdoptablePokemon.pid = AdoptionLogs.pid
		JOIN Pokemon ON Pokemon.pokedex_number = AdoptablePokemon.pokedex_number
		WHERE action_type = 'adopt'
		ORDER BY log_date DESC;
	""")

@app.route("/api/most-adopted")
def most_adopted():
	limit = int(request.args.get("limit", "50"))
	return run_query(
		"""
		SELECT Pokemon.pokedex_number AS pokedexNumber, name, count(*) AS totalAdoptions
		FROM Pokemon
		JOIN AdoptablePokemon ON AdoptablePokemon.pokedex_number = Pokemon.pokedex_number
		JOIN AdoptionLogs ON AdoptionLogs.pid = AdoptablePokemon.pid
		WHERE action_type = 'adopt'
		GROUP BY pokedexNumber
		ORDER BY totalAdoptions DESC, name
		LIMIT %s;
	""", (limit,))

@app.route("/api/set-preferences/<int:uid>", methods=["PUT"])
def set_preferences(uid):
	try:
		data = request.json
		change = lambda s: s.__repr__().replace("'", "\"").replace(", ", ",")
		pref_abilities = change(data.get("pref_abilities", ""))
		pref_types = change(data.get("pref_types", ""))
		run_query("UpdateAdopterPreferences", (uid, pref_abilities, pref_types), True)
		return jsonify({"success": True}), 200
	except Exception as e:
		print(e)
		return jsonify({"error": "Error occurred"}), 400

if __name__ == "__main__":
	app.run(debug=True, port=5000)