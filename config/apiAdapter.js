const axios = require('axios');

// eslint-disable-next-line object-shorthand
module.exports = baseURL => axios.create({ baseURL: baseURL });
