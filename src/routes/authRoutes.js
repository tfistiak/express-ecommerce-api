const express = require('express');
const { register, login } = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();


// Register route
router.post('/register', upload.single('profileImage'), register);

// Login route
router.post('/login', login);

module.exports = router;