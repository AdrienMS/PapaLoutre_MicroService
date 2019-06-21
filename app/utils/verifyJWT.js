const apiAdapter = require('../../config/apiAdapter');

const BASE_URL = process.env.AUTH_URL;
const api = apiAdapter(BASE_URL);

async function verifyJWT(token, req) {
    if (token) {
        try {
            const toReturn = await api.get('/api/verify', { headers: { Authorization: token } });
            return { success: true, user_id: toReturn.data.datas.user_id };
        } catch (err) {
            if (err.response) {
                const error = err.response.data;
                const msg = `${req.url} : ${error.message !== undefined && error.message !== null ? error.message : error.name}`;
                return { success: false, error: { status: error.httpCode, message: msg } };
            } else {
                return { success: false, error: { status: 503, message: `The server ${BASE_URL}/api/verify is not available` } };
            }
        }
    }

    return { success: false, error: { status: 500, message: 'An error occured' } };
}

module.exports = verifyJWT;
