const User = require('../models/userModel');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const profileImage = req.file ? req.file.path : null;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateUser = {
            $set: {}
        };

        if (name) updateUser.$set.name = name;
        if (email) updateUser.$set.email = email;
        if (profileImage) updateUser.$set.profileImage = profileImage;

        if (Object.keys(updateUser.$set).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateUser,
            { new: true}
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};