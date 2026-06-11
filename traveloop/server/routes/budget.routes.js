const express = require('express');
const router = express.Router();
const {
  getBudget,
  updateBudget
} = require('../controllers/budget.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All budget routes require authentication
router.use(authMiddleware);

// GET /api/budget/trip/:tripId - Get budget breakdown
router.get('/trip/:tripId', getBudget);

// PUT /api/budget/trip/:tripId/budget - Update trip budget
router.put('/trip/:tripId/budget', updateBudget);

module.exports = router;
