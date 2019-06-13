const express = require('express');
const apiAdapter = require('../../config/apiAdapter');

const router = express.Router();
const BASE_URL = 'http://localhost:3001';
const api = apiAdapter(BASE_URL);

// eslint-disable-next-line no-unused-vars
router.get('/auth', (req, res, next) => {
    api.get('/api')
        .then((resp) => {
            res.send(resp.data);
        })
        .catch((err) => {
            const error = err.response.data;
            const msg = `${req.url} : ${error.message !== undefined && error.message !== null ? error.message : error.name}`;
            next({ status: error.httpCode, message: msg });
        });
});

module.exports = router;
