# Papa Loutre Micro Service
## Overview

This is the microservice API of Papa Loutre.
This works with :
  - NodeJS 12.3.1
  - Express 4.17.0
  - PostgreSQL 11.2
  - Gulp 4.0.2
  - Eslint 5.16 (AirBnB)
  - nyc 14.1.1
  - mocha 6.1.4
  - chai 4.2.0
  - Babel 7.4.4
  - Swagger UI Express 4.0.6
  - Docker


# Getting Started
## Dependencies

All services are in differents repositories.
You have to clone all this repositories in services folder.

### Authentication
```sh
git clone https://github.com/AdrienMS/PapaLoutre_Authentication.git
```

## With Docker

Run docker compose:
```sh
docker-compose up
```

If the run failed with postgres container, run:

```sh
docker-compose down
docker-compose up --force-recreate
```

The next time, just run docker compose normally

If you add changes, run the following command so that docker can take them into account :

```sh
docker-compose up --build
```

Then, the node server will run on localhost:3000 and the postgres on localhost:5432

## Without Docker

Install [node](https://nodejs.org/en/)


Install dependencies:

```sh
npm install
```

Set environment (vars):

```sh
cp env.example .env
```

Start server:

```sh
npm start
```

The server will start on localhost:3000