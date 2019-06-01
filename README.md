# Papa Loutre Rest API base
## Overview

This is the rest API base for microservice API of Papa Loutre.
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
  - Docker


# Getting Started
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

if you add changes, run the following command so that docker can take them into account :

```sh
docker-compose up --build
```

## Without Docker

You have to install [postgres](https://www.postgresql.org) locally.

Install yarn:

```js
npm install -g yarn
```

Install dependencies:

```sh
yarn
```

Set environment (vars):

```sh
cp env.example .env
```

Start server:

```sh
yarn start
```
