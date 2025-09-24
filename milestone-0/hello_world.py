import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="pokemon"
)

cursor = connection.cursor()

cursor.execute("SELECT * FROM Pokemon;")
for row in cursor.fetchall():
    print(row)

cursor.close()
connection.close()
