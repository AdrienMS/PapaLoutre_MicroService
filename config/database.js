require('dotenv').config();
const { Client } = require('pg');
const logger = require('../lib/logger/logger');

const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
});

client.connect()
    .then(() => {
        console.info('connected');
        // eslint-disable-next-line no-multi-str
        client.query('CREATE TABLE IF NOT EXISTS \
            auth(id serial PRIMARY KEY, \
                username VARCHAR (50) UNIQUE NOT NULL, \
                password VARCHAR (355) NOT NULL, \
                email VARCHAR (355) UNIQUE NOT NULL, \
                created_on TIMESTAMP NOT NULL, \
                last_login TIMESTAMP)',
        (err, res) => {
            if (err) {
                logger.error(`An error occured in database : ${err}`);
            } else {
                logger.info(res);
            }
            client.end();
        });
    })
    .catch(() => logger.error('error while connecting'));


module.exports = client;
