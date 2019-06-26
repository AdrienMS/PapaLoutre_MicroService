require('dotenv').config();
const express = require('express');
const apiAdapter = require('../../../config/apiAdapter');
const verify = require('../../utils/verifyJWT');

const router = express.Router();
const BASE_URL = process.env.AUTH_URL;
const api = apiAdapter(BASE_URL);

// eslint-disable-next-line no-unused-vars
router.delete('/delete', (req, res, next) => {
    const token = req.headers.authorization;
    if (token === null) {
        next({ status: 400, message: 'The token has not been sent' });
        return;
    }
    verify(token, req)
        .then((result) => {
            if (result.success) {
                api.delete(`/api/delete/${result.user_id}`, { headers: { authorization: token } })
                    .then((resp) => {
                        res.send(resp.data);
                    })
                    .catch((err) => {
                        if (err.response) {
                            const error = err.response.data;
                            const msg = `${req.url} : ${error.message !== undefined && error.message !== null ? error.message : error.name}`;
                            next({ status: error.httpCode, message: msg });
                        } else {
                            next({ status: 503, message: `The server ${BASE_URL}/api/delete is not available` });
                        }
                    });
            } else {
                next(result.error);
            }
        })
        .catch((err) => {
            if (err.response) {
                const error = err.response.data;
                const msg = `${req.url} : ${error.message !== undefined && error.message !== null ? error.message : error.name}`;
                next({ status: error.httpCode, message: msg });
            } else {
                next({ status: 503, message: `The server ${BASE_URL}/api/delete is not available` });
            }
        });
});

module.exports = router;
