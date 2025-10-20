# CS348 Project – Milestone 1

The following commands assume your current directory is `cs348-project/milestone-1`

## Requirements

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
