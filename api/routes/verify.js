const { Router } = require('express')

const router = Router()

const checkAuth = require('../checkAuth')

router.post('/verify', checkAuth)

module.exports = router