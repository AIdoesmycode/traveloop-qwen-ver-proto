const { body, param, query } = require('express-validator');

const createTripValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Trip title is required')
    .isLength({ max: 200 }).withMessage('Title must not exceed 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must not exceed 1000 characters'),
  
  body('start_date')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid start date format'),
  
  body('end_date')
    .notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('Invalid end date format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_date)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('total_budget')
    .optional()
    .isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
  
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AED']).withMessage('Invalid currency')
];

const updateTripValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid trip ID'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Title must not exceed 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must not exceed 1000 characters'),
  
  body('start_date')
    .optional()
    .isISO8601().withMessage('Invalid start date format'),
  
  body('end_date')
    .optional()
    .isISO8601().withMessage('Invalid end date format'),
  
  body('total_budget')
    .optional()
    .isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
  
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AED']).withMessage('Invalid currency'),
  
  body('status')
    .optional()
    .isIn(['planning', 'ongoing', 'completed']).withMessage('Invalid status')
];

module.exports = {
  createTripValidator,
  updateTripValidator
};
