import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="pokemon"
)

cursor = conn.cursor()

# Run a query
cursor.execute("SELECT * FROM Pokemon;")
for row in cursor.fetchall():
    print(row)

cursor.close()
conn.close()
