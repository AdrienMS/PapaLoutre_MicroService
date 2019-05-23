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
    .then(() => console.log('connected'))
    .catch(() => console.log('error while connecting'));

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

server.get('/', (req, res) => res.status(200).send('hello'));
