import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {
    try {
        // Get token from cookies or headers
        const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.json({ success: false, message: 'Authentication required' });
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user and attach to request
        const user = await userModel.findById(decoded.userId);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        // Attach user to request object
        req.user = user;
        
        next();
    } catch (error) {
        console.error("Auth middleware error:", error); // Detailed error logging
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;