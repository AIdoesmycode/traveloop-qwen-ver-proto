const express = require('express');
const router = express.Router();
const {
  getPackingItems,
  addPackingItem,
  updatePackingItem,
  deletePackingItem,
  resetPackingList
} = require('../controllers/packing.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All packing routes require authentication
router.use(authMiddleware);

// GET /api/packing/trip/:tripId - Get all packing items
router.get('/trip/:tripId', getPackingItems);

// POST /api/packing/trip/:tripId - Add packing item
router.post('/trip/:tripId', addPackingItem);

// PUT /api/packing/:itemId - Update packing item
router.put('/:itemId', updatePackingItem);

// DELETE /api/packing/:itemId - Delete packing item
router.delete('/:itemId', deletePackingItem);

// DELETE /api/packing/trip/:tripId/reset - Reset packing list
router.delete('/trip/:tripId/reset', resetPackingList);

module.exports = router;
