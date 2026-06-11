const express = require('express');
const router = express.Router();
const {
  shareTrip,
  getPublicTrip,
  exportItinerary
} = require('../controllers/share.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public route - get trip by share token
router.get('/:token', getPublicTrip);

// Protected routes
router.use(authMiddleware);

// POST /api/share/:tripId - Generate/toggle share token
router.post('/:tripId', shareTrip);

// GET /api/share/:tripId/export - Export itinerary
router.get('/:tripId/export', exportItinerary);

module.exports = router;
