# CS348 Project – Milestone 0

**Pokémon Adoption App**

This read me explains how to run the database for Pokémon assuming files `schema.sql` and `hello_world.py` are in the **current folder**.

---

## Requirements

- **MySQL**

  - **macOS (Homebrew):**
    ```bash
    brew install mysql
    brew services start mysql
    ```
  - **Ubuntu/Debian:**
    ```bash
    sudo apt update
    sudo apt install mysql-server
    sudo systemctl start mysql
    ```
  - **Windows:**  
    Download and install from [MySQL Installer](https://dev.mysql.com/downloads/installer/)

- **Python 3**

  - Most systems have it preinstalled. Check with:
    ```bash
    python3 --version
    ```
  - If missing, install via [python.org](https://www.python.org/downloads/) or with Homebrew on macOS:
    ```bash
    brew install python
    ```

- **Virtual environment (recommended on macOS with Homebrew Python):**
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

---

## Files in this folder

- `schema.sql` — creates a toy `pokemon` database, a `Pokemon` table, and inserts 3 rows
- `hello_world.py` — connects to MySQL and prints rows from `Pokemon`

---

## Set up the database

Run this from **this folder**:

```bash
mysql -u root -p < schema.sql
```

---

## Run the Python script

Install the MySQL connector (inside your venv if using one), then run the script:

```bash
pip install mysql-connector-python
cd milestone-0
python3 hello_world.py
```

Expected output:

```
(1, 'Pikachu', 'Electric')
(2, 'Charmander', 'Fire')
(3, 'Squirtle', 'Water')
```

---
