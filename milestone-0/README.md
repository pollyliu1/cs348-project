# CS348 Project – Milestone 0


The following commands assume your current directory is `cs348-project/milestone-0`

## Requirements

- **MySQL**

  - **macOS:**
    ```bash
    brew install mysql
    brew services start mysql
    ```
  - **Windows:**  
    Download and install from [MySQL Installer](https://dev.mysql.com/downloads/installer/)

- **Python**

  - Check if you have Python installed:
    ```bash
    python3 --version
    ```
  - If not, install via [python.org](https://www.python.org/downloads/) or on macOS you can run:
    ```bash
    brew install python
    ```

- **Virtual environment:**
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

## Set up the database

```bash
mysql -u root -p < schema.sql
```

If prompted for a password, just hit enter.

## Run the Python script

```bash
pip install -r ../requirements.txt
python3 hello_world.py
```

Expected output:

```
(1, 'Pikachu', 'Electric')
(2, 'Charmander', 'Fire')
(3, 'Squirtle', 'Water')
```
