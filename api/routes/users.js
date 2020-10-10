const { Router } = require('express')
const router = Router()

const userController = require('../controllers/userController')
const checkAuth = require('../checkAuth')

//Register user
router.post('/register', userController.register)

//Login user
router.post('/login', userController.login)

//Get user profile by ID
router.get('/profiles/:userId', userController.profile)

//Get all user profiles
router.get('/profiles', userController.profiles)

module.exports = router