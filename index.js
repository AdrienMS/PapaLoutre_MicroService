require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const server = require('./config/express');

const PORT = process.env.PORT || 3000;

if (!module.parent) {
    server.listen(PORT, () => console.info(`Server running on ${PORT}`));
}

module.exports = server;
