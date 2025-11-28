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

## Manually set up the database

The following steps are now performed automatically when running the app. If you are ever prompted for a password, just hit enter.

```bash
mysql -u root -p < createtables.sql
mysql --local-infile=1 -u root -p < populatetables.sql
mysql -u root -p < query3_advanced.sql
mysql -u root -p < query4_advanced.sql
mysql -u root -p < query5_advanced.sql
```

## Query the database to test

```bash
mysql -u root -p
USE PokeAdopt;
SELECT * FROM Pokemon LIMIT 5;
```

## Implemented Features

### 1. Browse Available Pokemon (R6)

**Frontend Files:** `Wiki.tsx`  
**Backend Endpoint:** `GET /api/search-pokemon`

**Description:**
The user visits the search page on the Pokémon Adoption website. A check-list menu lets them select a Pokémon type (Fire, Water, Grass, etc). They can choose a sorting order such as Base Happiness ascending or descending.

**Performance:**  
For this query, indexes were added on `type1`, `type2`, and `base_happiness` in the Pokemon table.

---

### 2. Monitor Recent Adoption Activity (R7)

**Frontend File:** `Adopt.tsx`  
**Backend Endpoint:** `GET /api/recently-adopted`

**Description:**  
Allows admins to view Pokémon adopted in the last 30 days. The UI displays a table with Pokémon name, nickname, adopter username, and adoption date. The backend query joins `AdoptablePokemon` and `AdoptionLogs` and filters by `log_date`.

**Performance:**  
Indexes were added on `log_date` and `pid` in `AdoptionLogs` to reduce scan and join cost.

---

### 3. Create New Adoptable Pokémon (R8)

**Frontend File:** `Adopt.tsx`  
**Backend Endpoint:** `POST /api/add-pokemon`

**Description:**  
Admins can add a new adoption listing by submitting pokedex number, nickname, and description. The backend validates inputs and inserts a new row into `AdoptablePokemon` with today’s `add_date`.

**Performance:**  
No extra indexes created. Inserts already use the primary key index on `pid`.

---

### 4. Edit Existing Adoption Listing (R9)

**Frontend File:** `AdoptionCard.tsx`  
**Backend Endpoint:** `PUT /api/update-pokemon/{pid}`

**Description:**  
Admins can update nickname and description of an existing listing. The UI loads the current values and sends changes to the backend, which updates the row using primary key `pid`.

**Performance:**  
No new index added. The primary key index on `pid` already supports efficient updates.

---

### 5. Update Adoptable Pokémon Details (R10)

**Frontend File:** `AdoptionCard.tsx`  
**Backend Endpoint:** `PUT /api/update-pokemon/{pid}`

**Description:**  
Allows admins to modify an adoptable Pokémon's nickname and description. The UPDATE query targets a specific `pid` in the `AdoptablePokemon` table and sets new values for `nickname` and `description` fields. This enables admins to refine listing information as needed.

**Performance:**  
Uses the primary key index on `pid` for efficient row lookup. No additional indexes required since UPDATE operations by primary key are already optimized.

---

### 6. Personalized Pokémon Recommendations (R11)

**Frontend File:** `Adopt.tsx`  
**Backend Endpoint:** `GET /api/search-adoptable-pokemon?order=compatibility`

**Description:**  
This query computes a compatibility score between each adoptable Pokémon and a specific user by comparing the user's preferred types and abilities stored as JSON arrays with each Pokémon's attributes. It assigns weighted points for matches and sorts the results by total score to present the best recommendations.

---

### 7. Full Text Relevance Search (R12)

**Frontend File:** `Adopt.tsx`  
**Backend Endpoint:** `GET /api/search-adoptable-pokemon?order=relevance`

**Description:**  
This query performs a full text search across several Pokémon attributes such as name, types, abilities, nickname, and description. It assigns weighted scores based on where matches occur and returns results sorted by overall relevance so users can quickly find suitable Pokémon.

---

### 8. Automatic Adoption Status Triggers (R13)

**Description:**  
This feature uses AFTER INSERT triggers on the AdoptionLogs table to automatically update Pokémon availability when an adoption or unadoption is recorded. It ensures that each Pokémon's status remains consistent with its adoption history without requiring manual updates.

---

### 9. Unified Adoptable Pokémon View (R14)

**Description:**  
This view combines data from AdoptablePokemon and Pokémon into a single structure that includes species information along with adoption specific fields. It allows the application to query a unified dataset without rewriting join logic in multiple places.

---

### 10. User Management Stored Procedures (R15)

**Description:**  
These stored procedures implement core user management operations including account creation with hashed passwords, login verification, and updating user preferences for the recommendation system. They organize authentication and profile logic in the database to keep the application consistent and maintainable.
