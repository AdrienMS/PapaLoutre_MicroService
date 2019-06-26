const router = require('express').Router();

router.post('/login', require('./login.route'));
router.post('/register', require('./register.route'));
router.delete('/delete', require('./delete.route'));

module.exports = router;
