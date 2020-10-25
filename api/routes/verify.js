const { Router } = require('express');
const router = Router();

const check = require('../check');

router.post('/verify', check.auth);

module.exports = router;