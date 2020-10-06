const { Router } = require('express')
const router = Router()

const userController = require('../controllers/userController')


router.post('/register', userController.register)

module.exports = router