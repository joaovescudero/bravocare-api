# Bravo Care Back-end Api

## Pre-requisites

- Node.js v16.13.2
- PostgreSQL v13.7

## Initial setup

### Using Docker
- Run `docker-compose up -d` to start the database and the api.

### Using local Postgres
- Create a database named `bravocare` in your local Postgres instance.
- Run the SQL script `./scripts/create-tables.sql` to create the tables.
- Change the database connection string in `.env` to point to your local Postgres instance.

### Install dependencies
- Run `npm install` to install the dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the api in the development mode.\
It'll be served on [http://localhost:4000](http://localhost:4000).
