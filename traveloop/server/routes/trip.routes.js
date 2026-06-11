const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const { createTripValidator, updateTripValidator } = require('../validators/trip.validator');
const validateMiddleware = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/multer');

// All routes require authentication
router.use(authMiddleware);

// GET /api/trips - Get all trips for logged-in user
router.get('/', tripController.getTrips);

// POST /api/trips - Create new trip
router.post('/', upload.single('cover'), createTripValidator, validateMiddleware, tripController.createTrip);

// GET /api/trips/:id - Get trip detail with stops
router.get('/:id', tripController.getTrip);

// PUT /api/trips/:id - Update trip
router.put('/:id', upload.single('cover'), updateTripValidator, validateMiddleware, tripController.updateTrip);

// DELETE /api/trips/:id - Delete trip
router.delete('/:id', tripController.deleteTrip);

// PUT /api/trips/:id/cover - Upload cover photo
router.put('/:id/cover', upload.single('cover'), tripController.uploadCover);

// POST /api/trips/:id/share - Generate/toggle public share token
router.post('/:id/share', tripController.toggleShare);

// GET /api/trips/:id/export - Export itinerary as JSON
router.get('/:id/export', tripController.exportTrip);

// GET /api/trips/:id/budget - Get budget breakdown
router.get('/:id/budget', tripController.getBudget);

// PUT /api/trips/:id/budget - Update trip budget cap
router.put('/:id/budget', tripController.updateBudget);

module.exports = router;
