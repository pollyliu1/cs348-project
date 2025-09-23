# CS 348 — Pokémon Adoption App

This README shows **exact steps to create and load a small sample MySQL database** for our project, plus a tiny “hello world” app that connects and runs a query. You can do this **locally** (MySQL installed) or with **Docker**. No Kaggle download is required for this sample; we use a toy dataset.

---

## What you’ll set up

* A MySQL database named `pokemon_adoption`
* Four tables: `users`, `pokemon_lookup`, `shelter_pokemon`, `adoption_events`
* A few sample rows (Bulbasaur, Charmander, Squirtle, Pikachu, Eevee)
* A minimal Node.js script that connects and selects rows

> If you prefer another client (Python, Java, etc.), the schema and seed are the same.

---

## Option A — Local MySQL

### 1) Prereqs

* MySQL 8.x (or compatible) installed and running
* A MySQL user with privileges (e.g., `root`) and password
* Terminal access

### 2) Create DB and user (optional)

```sql
-- You can run these inside the MySQL client (mysql -u root -p)
CREATE DATABASE IF NOT EXISTS pokemon_adoption CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- (Optional) create a dedicated dev user
CREATE USER IF NOT EXISTS 'cs348'@'localhost' IDENTIFIED BY 'cs348pwd';
GRANT ALL PRIVILEGES ON pokemon_adoption.* TO 'cs348'@'localhost';
FLUSH PRIVILEGES;
```

### 3) Create schema

Save as **`schema.sql`** and run it (see “Run scripts” below).

```sql
-- schema.sql
USE pokemon_adoption;

-- Users of the app (admin or user)
CREATE TABLE IF NOT EXISTS users (
  username        VARCHAR(50) PRIMARY KEY,
  password_hash   VARCHAR(255) NOT NULL,
  role            ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Master list of Pokémon (toy subset of fields)
CREATE TABLE IF NOT EXISTS pokemon_lookup (
  pokedex_id    INT PRIMARY KEY,
  name          VARCHAR(50) NOT NULL,
  type1         VARCHAR(20) NOT NULL,
  type2         VARCHAR(20) NULL,
  is_legendary  BOOLEAN NOT NULL DEFAULT FALSE,
  base_attack   INT NOT NULL,
  base_defense  INT NOT NULL,
  base_speed    INT NOT NULL
);

-- Individual Pokémon that pass through the shelter
CREATE TABLE IF NOT EXISTS shelter_pokemon (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  pokedex_id        INT NOT NULL,
  nickname          VARCHAR(50) NULL,
  status            ENUM('available','adopted','returned') NOT NULL DEFAULT 'available',
  added_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  adopted_at        TIMESTAMP NULL,
  adopter_username  VARCHAR(50) NULL,
  CONSTRAINT fk_sp_pokedex
    FOREIGN KEY (pokedex_id) REFERENCES pokemon_lookup(pokedex_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_sp_user
    FOREIGN KEY (adopter_username) REFERENCES users(username)
      ON UPDATE CASCADE ON DELETE SET NULL
);

-- Audit log of adoption-related events
CREATE TABLE IF NOT EXISTS adoption_events (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  pokemon_id    INT NOT NULL,
  actor         VARCHAR(50) NULL,          -- staff or adopter username
  action        ENUM('listed','adopted','returned') NOT NULL,
  action_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes         VARCHAR(255) NULL,
  CONSTRAINT fk_ae_pokemon
    FOREIGN KEY (pokemon_id) REFERENCES shelter_pokemon(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_ae_actor
    FOREIGN KEY (actor) REFERENCES users(username)
      ON UPDATE CASCADE ON DELETE SET NULL
);
```

### 4) Seed data

Save as **`seed.sql`**.

```sql
-- seed.sql
USE pokemon_adoption;

INSERT INTO users (username, password_hash, role) VALUES
  ('admin', '$2y$10$adminhash', 'admin'),
  ('misty', '$2y$10$userhash1', 'user'),
  ('brock', '$2y$10$userhash2', 'user');

INSERT INTO pokemon_lookup (pokedex_id, name, type1, type2, is_legendary, base_attack, base_defense, base_speed) VALUES
  (1,  'Bulbasaur',  'Grass',  'Poison',  FALSE, 49, 49, 45),
  (4,  'Charmander', 'Fire',   NULL,      FALSE, 52, 43, 65),
  (7,  'Squirtle',   'Water',  NULL,      FALSE, 48, 65, 43),
  (25, 'Pikachu',    'Electric', NULL,    FALSE, 55, 40, 90),
  (133,'Eevee',      'Normal', NULL,      FALSE, 55, 50, 55);

-- A few shelter entries
INSERT INTO shelter_pokemon (pokedex_id, nickname, status) VALUES
  (1,  'Bulby',    'available'),
  (4,  'Flamey',   'available'),
  (7,  'Shells',   'available'),
  (25, 'Spark',    'adopted'),
  (133,'Vee',      'returned');

-- Mark the adopted one
UPDATE shelter_pokemon SET adopter_username = 'misty', adopted_at = NOW() WHERE nickname = 'Spark';

-- Log some events
INSERT INTO adoption_events (pokemon_id, actor, action, notes)
SELECT id, 'admin', 'listed', 'Listed for adoption' FROM shelter_pokemon;

INSERT INTO adoption_events (pokemon_id, actor, action, notes)
SELECT id, 'misty', 'adopted', 'Found a forever trainer' FROM shelter_pokemon WHERE nickname = 'Spark';
```

### 5) Run scripts

From your terminal:

```bash
# 5a) Run schema
mysql -u root -p < schema.sql

# 5b) Run seed
mysql -u root -p < seed.sql
```

> Replace `-u root -p` with your user (e.g., `-u cs348 -pcs348pwd`).

### 6) Quick sanity checks

```sql
-- Inside mysql client
USE pokemon_adoption;
SELECT COUNT(*) AS users FROM users;
SELECT name, type1, type2 FROM pokemon_lookup ORDER BY pokedex_id;
SELECT sp.id, pl.name, sp.status, sp.adopter_username
FROM shelter_pokemon sp
JOIN pokemon_lookup pl ON pl.pokedex_id = sp.pokedex_id
ORDER BY sp.id;
```

---

## Option B — Docker (MySQL 8)

### 1) Start MySQL

```bash
docker run --name mysql-pokemon -e MYSQL_ROOT_PASSWORD=rootpwd \
  -e MYSQL_DATABASE=pokemon_adoption -p 3306:3306 -d mysql:8
```

### 2) Copy scripts into container

```bash
docker cp schema.sql mysql-pokemon:/schema.sql
docker cp seed.sql   mysql-pokemon:/seed.sql
```

### 3) Execute scripts in container

```bash
docker exec -it mysql-pokemon mysql -uroot -prootpwd < /schema.sql
docker exec -it mysql-pokemon mysql -uroot -prootpwd < /seed.sql
```

### 4) Verify

```bash
docker exec -it mysql-pokemon mysql -uroot -prootpwd -e "USE pokemon_adoption; SHOW TABLES; SELECT COUNT(*) FROM shelter_pokemon;"
```

To stop & remove later:

```bash
docker stop mysql-pokemon && docker rm mysql-pokemon
```

---

## “Hello World” DB app (Node.js)

This tiny script connects and prints all **available** Pokémon with their base types. Place it under `milestone-0/hello-world/app.js` (or any folder you prefer).

### 1) Set up

```bash
mkdir -p milestone-0/hello-world
cd milestone-0/hello-world
npm init -y
npm i mysql2 dotenv
```

Create a **`.env`** file:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=rootpwd
DB_NAME=pokemon_adoption
```

Create **`app.js`**:

```js
// app.js
require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  const [rows] = await conn.execute(`
    SELECT pl.name, pl.type1, pl.type2, sp.nickname
    FROM shelter_pokemon sp
    JOIN pokemon_lookup pl ON pl.pokedex_id = sp.pokedex_id
    WHERE sp.status = 'available'
    ORDER BY pl.pokedex_id;
  `);

  console.log('Available Pokémon:');
  for (const r of rows) {
    const type = r.type2 ? `${r.type1}/${r.type2}` : r.type1;
    console.log(`- ${r.name} (${type})` + (r.nickname ? ` a.k.a. "${r.nickname}"` : ''));
  }

  await conn.end();
})().catch(err => {
  console.error('DB error:', err.message);
  process.exit(1);
});
```

Run it:

```bash
node app.js
```

You should see a list of available Pokémon from the sample data.

---

## Common issues

* **Access denied**: Double‑check `DB_USER`/`DB_PASS`, and that the user has privileges on `pokemon_adoption`.
* **Port in use** (Docker): Change `-p 3306:3306` to another host port, e.g. `-p 3307:3306`, and update `.env`.
* **Foreign key errors**: Ensure you run **`schema.sql` before `seed.sql`**.

---

## Suggested repo layout

```
cs348-project/
├─ milestone-0/
│  ├─ sample-db/
│  │  ├─ schema.sql
│  │  └─ seed.sql
│  └─ hello-world/
│     ├─ app.js
│     └─ .env (local only; do NOT commit)
├─ milestone-1/
├─ milestone-2/
└─ milestone-3/
```

> Share the GitHub repo with the TA. For each milestone, include any additional READMEs, scripts, and data under the appropriate folder.

---

## Next steps

* Expand the schema (indexes, constraints)
* Build a React frontend + simple API (Express/FastAPI/etc.)
* Add staff/admin flows (list new Pokémon, mark adopted/returned)
