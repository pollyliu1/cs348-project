# CS348 Project – Milestone 3

The following commands assume your current directory is `cs348-project/milestone-3`. Note that the DB setup and query files for production are within this directory, and the counterpart sample files are in the `sample-dataset` subdirectory.

# Run Application

## Set up environment

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

## Set up the database

If you are ever prompted for a password, just hit enter.

```bash
mysql -u root -p < createtables.sql
mysql --local-infile=1 -u root -p < populatetables.sql
```

## Query the database to test

```bash
mysql -u root -p
USE PokeAdopt;
SELECT * FROM Pokemon LIMIT 5;
```

## Implemented Features

### 1. Recent Adoptions (R6)

**Frontend Files:** `Wiki.tsx`, `SearchBar.tsx`  
**Backend Endpoint:** `GET /api/search-pokemon`

**Description:**  
Allows admins to view Pokémon adopted in the last 30 days. The UI displays a table with Pokémon name, nickname, adopter username, and adoption date. The backend query joins `AdoptablePokemon` and `AdoptionLogs` and filters by `log_date`.

**Performance:**  
Indexes were added on `log_date` and `pid` in `AdoptionLogs` to reduce scan and join cost.

---

### 2. Create New Adoptable Pokémon (R8)

**Frontend File:** `Adopt.tsx`  
**Backend Endpoint:** `POST /api/add-pokemon`

**Description:**  
Admins can add a new adoption listing by submitting pokedex number, nickname, and description. The backend validates inputs and inserts a new row into `AdoptablePokemon` with today’s `add_date`.

**Performance:**  
No extra indexes created. Inserts already use the primary key index on `pid`.

---

### 3. Edit Existing Adoption Listing (R9)

**Frontend File:** `AdoptionCard.tsx`  
**Backend Endpoint:** `PUT /api/update-pokemon/{pid}`

**Description:**  
Admins can update nickname and description of an existing listing. The UI loads the current values and sends changes to the backend, which updates the row using primary key `pid`.

**Performance:**  
No new index added. The primary key index on `pid` already supports efficient updates.

---

### 4. Update Adoptable Pokémon Details (R10)

**Frontend File:** `AdoptionCard.tsx`  
**Backend Endpoint:** `PUT /api/update-pokemon/{pid}`

**Description:**  
Allows admins to modify an adoptable Pokémon's nickname and description. The UPDATE query targets a specific `pid` in the `AdoptablePokemon` table and sets new values for `nickname` and `description` fields. This enables admins to refine listing information as needed.

**Performance:**  
Uses the primary key index on `pid` for efficient row lookup. No additional indexes required since UPDATE operations by primary key are already optimized.

---

### 5. Most Popular Pokémon Species by Adoption Count (R11)

**Frontend File:** `Wiki.tsx`  
**Backend Endpoint:** `GET /api/popular-pokemon`

**Description:**  
Displays the most frequently adopted Pokémon species to help identify adoption trends. The query joins `AdoptionLogs`, `AdoptablePokemon`, and `Pokemon` tables, filters for 'adopt' action types, groups by Pokédex number and name, and counts total adoptions. Results are ordered by adoption count in descending order.

**Performance:**  
Indexes on `pid` in both `AdoptionLogs` and `AdoptablePokemon` optimize the joins. An index on `pokedex_number` in `AdoptablePokemon` speeds up the join to `Pokemon`. The `action_type` filter benefits from an index on `action_type` in `AdoptionLogs` to reduce rows scanned before grouping.
