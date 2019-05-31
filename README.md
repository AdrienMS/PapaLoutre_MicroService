# Papa Loutre API Authentication
## Overview

This is the authentication service of Papa Loutre. This is a part of a micro-service API.


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