require('dotenv').config();
const express = require('express');
const apiAdapter = require('../../../config/apiAdapter');

const router = express.Router();
const BASE_URL = process.env.AUTH_URL;
const api = apiAdapter(BASE_URL);

// eslint-disable-next-line no-unused-vars
router.post('/login', (req, res, next) => {
    const datas = {
        username: req.body.username !== undefined ? req.body.username : null,
        email: req.body.email !== undefined ? req.body.email : null,
        password: req.body.password !== undefined ? req.body.password : null,
    };
    if (datas.password === null) {
        next({ status: 400, message: 'You have to send password' });
        return;
    }
    if (datas.username === null && datas.email === null) {
        next({ status: 400, message: 'You have to send email or username' });
        return;
    }
    api.post('/api/login', datas)
        .then((resp) => {
            res.send(resp.data);
        })
        .catch((err) => {
            if (err.response) {
                const error = err.response.data;
                const msg = `${req.url} : ${error.message !== undefined && error.message !== null ? error.message : error.name}`;
                next({ status: error.httpCode, message: msg });
            } else {
                next({ status: 503, message: `The server ${BASE_URL}/api/login is not available` });
            }
        });
});

module.exports = router;
