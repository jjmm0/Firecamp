const { Router } = require('express')
const router = Router()

const userController = require('../controllers/userController')
const checkAuth = require('../checkAuth')

//Register User
router.post('/register', userController.register)

//Login User
router.post('/login', userController.login)

//Get User
router.get('/profiles/:userId', userController.profile)

module.exports = router