const { Router } = require('express')
const router = Router()
const multer = require('multer')

const userController = require('../controllers/userController')
const check = require('../check')

// Multer config
const storage = multer.diskStorage({
    destination: './api/avatar',
    async filename(req, file, cb) {
      const userid = "req.params.userId"
  
      cb(null, userid + '.jpg')
    },
  })
const upload = multer({ storage })


//Register user
router.post('/register', userController.register)

//Login user
router.post('/login', userController.login)




//Get user profile by ID
router.get('/profile/:userId', userController.profile)

//Get all user profiles
router.get('/profile', userController.profiles)

//Edit user profile
router.put('/profile', check.auth, userController.editprofile)

//User avatar upload
router.post('/avatar', upload.single('avatar'))



module.exports = router