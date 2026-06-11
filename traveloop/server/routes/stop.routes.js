const express = require('express');
const router = express.Router();
const {
  getStops,
  addStop,
  updateStop,
  deleteStop,
  reorderStops
} = require('../controllers/stop.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

// GET /api/stops/trip/:tripId - Get all stops for a trip
router.get('/trip/:tripId', getStops);

// PUT /api/stops/trip/:tripId/reorder - Reorder stops
router.put('/trip/:tripId/reorder', reorderStops);

// POST /api/stops/trip/:tripId - Add stop to trip
router.post('/trip/:tripId', addStop);

// PUT /api/stops/:stopId - Update stop
router.put('/:stopId', updateStop);

// DELETE /api/stops/:stopId - Delete stop
router.delete('/:stopId', deleteStop);

module.exports = router;
