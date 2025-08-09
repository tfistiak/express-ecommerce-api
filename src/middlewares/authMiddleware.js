const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        // Get the token from cookies if not in headers
        if (!token && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authorization failed' });
    }
};

module.exports = authMiddleware;