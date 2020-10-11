const { Router } = require('express')

const router = Router()

const checkAuth = require('../checkAuth')

router.post('/verify', checkAuth, (req, res) => {res.end()})

module.exports = router