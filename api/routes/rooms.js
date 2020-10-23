const { Router } = require('express')
const router = Router()

const roomController = require('../controllers/roomController')
const check = require('../check')

//Like
// router.post('/like', check.checkIsClient, (req, res) => {res.end()})

module.exports = router