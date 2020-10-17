const { Router } = require('express')
const router = Router()

const roomController = require('../controllers/roomController')
const check = require('../check')

//Get Rooms
router.post('/rooms', check.auth, (req, res) => {res.end()})

module.exports = router