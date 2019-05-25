require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const server = express();
const PORT = 3000;

const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB
});

client.connect()
    .then(() => {
        console.log('connected');
        client.query('CREATE TABLE IF NOT EXISTS \
            auth(id serial PRIMARY KEY, \
                username VARCHAR (50) UNIQUE NOT NULL, \
                password VARCHAR (355) NOT NULL, \
                email VARCHAR (355) UNIQUE NOT NULL, \
                created_on TIMESTAMP NOT NULL, \
                last_login TIMESTAMP)\
        ', (err, res) => {
            if (err) {
                console.err(err);
            } else {
                console.info(res);
            }
            client.end();
        });
    })
    .catch(() => console.log('error while connecting'));


server.listen(PORT, () => console.log(`Server running on ${PORT}`));

server.get('/', (req, res) => res.status(200).send('hello'));
