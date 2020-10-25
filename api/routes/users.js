const { Router } = require('express');
const router = Router();
const multer = require('multer');

// Import controllers etc.
const userController = require('../controllers/userController');
const check = require('../check');

// Multer config
const storage = multer.diskStorage({
  destination: './api/avatar',
  async filename(req, file, cb) {
    if(file.mimetype == 'image/jpeg' || 'image/png' || 'image/svg+xml'){
      const fileName = await check.userId(req);
      cb(null, fileName + '.png');
    }
  },
});
const upload = multer({ storage });


// Register user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);




// Get user profile by ID
router.get('/profile/:userId', userController.profile);

// Get all user profiles
router.get('/profile', userController.profiles);

// Edit user profile
router.put('/profile', check.auth, userController.editprofile);

// User avatar get
router.get('/avatar/:userId', userController.getAvatar);

// User avatar upload
router.post('/avatar', check.auth, upload.single('avatar'), userController.uploadAvatar);

// Export router
module.exports = router;