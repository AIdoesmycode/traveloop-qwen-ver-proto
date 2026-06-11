const express = require('express');
const router = express.Router();
const {
  getStopActivities,
  addActivityToStop,
  updateActivity,
  deleteActivity,
  searchActivities,
  getActivityDetail
} = require('../controllers/activity.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', searchActivities);
router.get('/:id', getActivityDetail);

// Protected routes for stop activities
router.use(authMiddleware);

// GET /api/activities/stop/:stopId - Get activities for a stop
router.get('/stop/:stopId', getStopActivities);

// POST /api/activities/stop/:stopId - Add activity to stop
router.post('/stop/:stopId', addActivityToStop);

// PUT /api/activities/:actId - Update activity
router.put('/:actId', updateActivity);

// DELETE /api/activities/:actId - Delete activity
router.delete('/:actId', deleteActivity);

module.exports = router;
