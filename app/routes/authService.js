require('dotenv').config();
const express = require('express');
const apiAdapter = require('../../config/apiAdapter');

const router = express.Router();
const BASE_URL = process.env.AUTH_URL;
const api = apiAdapter(BASE_URL);

// eslint-disable-next-line no-unused-vars
router.get('/auth', (req, res, next) => {
    api.get('/api')
        .then((resp) => {
            res.send(resp.data);
        })
        .catch((err) => {
            console.info(`DATA : ${err}`);
            if (err.response) {
                const error = err.response.data;
                const msg = `${req.url} : ${error.message !== undefined && error.message !== null ? error.message : error.name}`;
                next({ status: error.httpCode, message: msg });
            } else {
                next({ status: 503, message: `The server ${BASE_URL}/api is not available` });
            }
        });
});

module.exports = router;
