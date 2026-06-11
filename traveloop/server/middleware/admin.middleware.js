const { success, error } = require('../utils/responseHelper');

const adminMiddleware = async (req, res, next) => {
  try {
    // Check if user exists and has admin role
    if (!req.user || req.user.role !== 'admin') {
      return error(res, 'Access denied. Admin privileges required.', 403);
    }
    
    next();
  } catch (err) {
    return error(res, 'Authorization failed.', 500);
  }
};

module.exports = adminMiddleware;
