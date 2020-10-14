const { Router } = require('express')
const router = Router()
const multer = require('multer')
const upload = multer({ dest: '/api/avatars'})

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

//Edit user profile
router.put('/profiles', checkAuth, userController.editprofile)

//User avatar upload
router.post('/avatar', upload.single('avatar'), checkAuth, userController.avatar)

module.exports = router