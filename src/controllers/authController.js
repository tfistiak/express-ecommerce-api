const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const profileImage = req.file ? req.file.path : null;
     try {
      
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword, profileImage });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict', // Prevent CSRF attacks
        });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching user profile', error });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { username, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true }).select('-password');
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Error updating profile', error });
    }
};