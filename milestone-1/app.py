import mysql.connector
from flask import Flask, jsonify, send_from_directory, request

app = Flask(__name__)

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

    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="PokeAdopt"
    )

    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM Pokemon WHERE name LIKE '%{name}%';")
    col_names = [x[0] for x in cursor.description]
    data = []

    for row in cursor.fetchall():
        data.append(dict(zip(col_names, row)))

    cursor.close()
    connection.close()

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
    