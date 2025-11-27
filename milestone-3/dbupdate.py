import os
import subprocess

REQUIRED_DB_VERSION = 1
VERSION_FILE = "dbversion.txt"

def ensure_db_updated():
    # Step 1: Read current version (or assume 0)
    if not os.path.exists(VERSION_FILE):
        current_version = 0
    else:
        try:
            with open(VERSION_FILE, "r") as f:
                current_version = int(f.read().strip())
        except Exception:
            current_version = 0  # corrupted file → treat as outdated

    # Step 2: If already up-to-date, stop
    if current_version >= REQUIRED_DB_VERSION:
        print("Database already up to date.")
        return

    print(f"Database update required: {current_version} → {REQUIRED_DB_VERSION}")

    # Step 3: Commands to run (example)
    commands = [
        "mysql -u root < ./createtables.sql",
		"mysql --local-infile=1 -u root -p < populatetables.sql",
        "mysql -u root < ./query3_advanced.sql",
        "mysql -u root < ./query4_advanced.sql",
        "mysql -u root < ./query5_advanced.sql"
    ]

    for cmd in commands:
        print(f"Running: {cmd}")
        result = subprocess.run(cmd, shell=True)
        if result.returncode != 0:
            raise RuntimeError(f"Command failed: {cmd}")

    # Step 4: Update version file
    with open(VERSION_FILE, "w") as f:
        f.write(str(REQUIRED_DB_VERSION))

    print("Database update complete.")

if __name__ == "__main__":
    ensure_db_updated()