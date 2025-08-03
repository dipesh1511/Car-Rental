import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ success: false, message: 'Not authorized' });
    }
    try {
        // Get token from header
        const userId = jwt.decode(token, process.env.JWT_SECRET);

        if (!userId) {
            return res.json({ success: false, message: 'Not authorized' });
        }
        // Find user by ID removing password from the response
        req.user = await User.findById(userId).select('-password');
        next();
    } catch (error) {
        return res.json({ success: false, message: 'Not authorized' });
    }
};