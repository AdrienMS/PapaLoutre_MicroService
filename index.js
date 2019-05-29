require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const db = require('./config/database');
const server = require('./config/express');

const PORT = 3000;


server.get('/', (req, res) => res.status(200).send('hello'));

if (!module.parent) {
    server.listen(PORT, () => console.info(`Server running on ${PORT}`));
}

module.exports = server;
