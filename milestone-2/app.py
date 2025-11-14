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
	return run_query("SELECT * FROM Pokemon WHERE name LIKE %s;", (name,))

@app.route("/api/validate-pokemon")
def validate_pokemon():
	name = request.args.get("name", "")
	q = run_query("SELECT count(*) > 0 FROM Pokemon WHERE name = %s;", (name,))
	return jsonify(list(q[0].values())[0])

@app.route("/api/adoptable-pokemon")
def adoptable_pokemon():
	return jsonify(run_query("SELECT * FROM AdoptablePokemon;"))

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
	try:
		run_query(
			"UPDATE AdoptablePokemon SET nickname = %s, pokedex_number = " +
			"(SELECT pokedex_number FROM Pokemon WHERE name = %s), description = %s WHERE pid = %s;",
			(nickname, name, description, pid)
		)
		return jsonify({"success": True}), 200
	except:
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

if __name__ == "__main__":
	app.run(debug=True, port=5000)