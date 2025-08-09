const express = require('express');
const { getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, upload.single('profileImage'), updateUserProfile);


// Delete user account
router.delete('/profile', authMiddleware, deleteUserAccount);

module.exports = router;