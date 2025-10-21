import mysql.connector
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello_world():
	return send_from_directory(app.root_path, "index.html")

@app.route("/get_adopted")
def get_adopted():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="PokeAdopt"
    )

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM AdoptablePokemon;")
    col_names = [x[0] for x in cursor.description]
    data = []

    for row in cursor.fetchall():
        data.append(dict(zip(col_names, row)))

    cursor.close()
    connection.close()

    return jsonify(data)