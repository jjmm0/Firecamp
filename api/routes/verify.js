const { Router } = require('express')

const router = Router()

const check = require('../check')

router.post('/verify', check.auth, (req, res) => {res.end()})

module.exports = router