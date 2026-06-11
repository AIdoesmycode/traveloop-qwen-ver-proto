const { validationResult } = require('express-validator');
const { error } = require('../utils/responseHelper');

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const details = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg
    }));
    
    return error(res, 'Validation failed', 422, details);
  }
  
  next();
};

module.exports = validateMiddleware;
