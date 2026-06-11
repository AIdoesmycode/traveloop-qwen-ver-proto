const { error } = require('../utils/responseHelper');

const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return error(res, 'File too large. Maximum size is 2MB.', 400);
  }

  // Multer file type error
  if (err.message && err.message.includes('Invalid file type')) {
    return error(res, err.message, 400);
  }

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const details = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return error(res, 'Validation failed', 422, details);
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field';
    return error(res, `${field} already exists`, 409);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' 
    ? err.message 
    : 'Something went wrong. Please try again.';

  return error(res, message, statusCode);
};

module.exports = errorMiddleware;
