const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

/**
 * Authentication middleware that verifies JWT token from cookies or Authorization header
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Check for token in cookies first (preferred method)
    let token = req.cookies.jwt_token;
    
    // If no token in cookies, check Authorization header as fallback
    if (!token) {
      const authHeader = req.header('Authorization');
      if (authHeader) {
        token = authHeader;
      }
    }
    
    // If no token found anywhere, return unauthorized
    if (!token) {
      return res.status(401).json({ message: 'Authentication required. Please login.' });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    
    // Find the user
    const user = await userModel.findById(decoded.id);
    
    // If user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please signup.' });
    }
    
    // Add user ID to request object
    req.userId = user.id;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Handle token expiration specifically
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please login again.' });
    }
    
    return res.status(401).json({ message: 'Invalid token. Please login again.', error: error.message });
  }
};

module.exports = authMiddleware;
