const { body, param } = require('express-validator');

const createStopValidator = [
  param('tripId')
    .isInt({ min: 1 }).withMessage('Invalid trip ID'),
  
  body('city_id')
    .isInt({ min: 1 }).withMessage('City ID is required'),
  
  body('arrive_date')
    .notEmpty().withMessage('Arrival date is required')
    .isISO8601().withMessage('Invalid arrival date format'),
  
  body('depart_date')
    .notEmpty().withMessage('Departure date is required')
    .isISO8601().withMessage('Invalid departure date format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.arrive_date)) {
        throw new Error('Departure date must be after arrival date');
      }
      return true;
    }),
  
  body('notes')
    .optional()
    .trim(),
  
  body('est_stay_cost')
    .optional()
    .isFloat({ min: 0 }).withMessage('Estimated stay cost must be positive')
];

const updateStopValidator = [
  param('stopId')
    .isInt({ min: 1 }).withMessage('Invalid stop ID'),
  
  body('city_id')
    .optional()
    .isInt({ min: 1 }).withMessage('City ID must be a positive integer'),
  
  body('arrive_date')
    .optional()
    .isISO8601().withMessage('Invalid arrival date format'),
  
  body('depart_date')
    .optional()
    .isISO8601().withMessage('Invalid departure date format'),
  
  body('notes')
    .optional()
    .trim(),
  
  body('est_stay_cost')
    .optional()
    .isFloat({ min: 0 }).withMessage('Estimated stay cost must be positive')
];

const reorderStopsValidator = [
  body('orderedIds')
    .isArray({ min: 1 }).withMessage('orderedIds must be a non-empty array')
    .custom((value) => {
      if (!value.every(id => Number.isInteger(id) && id > 0)) {
        throw new Error('All IDs must be positive integers');
      }
      return true;
    })
];

module.exports = {
  createStopValidator,
  updateStopValidator,
  reorderStopsValidator
};
