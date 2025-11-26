import mysql.connector
from flask import Flask, jsonify, send_from_directory, request

app = Flask(__name__)

def run_query(query, parameters=()):
	connection = mysql.connector.connect(
		host="localhost",
		user="root",
		password="",
		database="PokeAdopt"
	)

	cursor = connection.cursor()
	cursor.execute(query, parameters)

	if not cursor.description:
		connection.commit()
		cursor.close()
		connection.close()
		return

	col_names = [x[0] for x in cursor.description]
	data = []

	for row in cursor.fetchall():
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
		run_query("SELECT a.pid as pid, a.nickname as nickname, p.name as name, a.description," +
				  "a.status as status, a.date_added as date_added FROM AdoptablePokemon AS a " +
				  "JOIN Pokemon AS p ON a.pokedex_number = p.pokedex_number;")
	)

@app.route("/api/adopt-pokemon/<int:pid>", methods=["PUT"])
def adopt_pokemon(pid):
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
		run_query(
			"INSERT INTO User (name, username, password) " +
			"VALUES (%s, %s, MD5(%s));",
			(name, username, password)
		)

		run_query(
			"INSERT INTO Adopter (uid, pref_abilities, pref_types) " +
			"VALUES ((SELECT uid FROM User WHERE username = %s), '[]', '[]');",
			(username,)
		)
		return jsonify({
			"pref_types": "[]",
			"pref_abilities": "[]",
			"uid": run_query("SELECT uid FROM User WHERE username = %s;", (username,))[0]["uid"],
			"name": name
		})
	except:
		return jsonify({"error": "Invalid username or password"}), 400
	return ""

@app.route("/api/login", methods=["POST"])
def login():
	data = request.json
	username = data.get("username", "")
	password = data.get("password", "")
	try:
		res = run_query(
			"SELECT * FROM User WHERE username = %s AND password = MD5(%s);",
			(username, password)
		)

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
			"name": res[0]["name"]
		})
	except:
		return jsonify({"error": "Invalid username or password"}), 400
	return ""

if __name__ == "__main__":
	app.run(debug=True, port=5000)