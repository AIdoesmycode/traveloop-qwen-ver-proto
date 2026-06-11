const express = require('express');
const router = express.Router();
const {
  getCities,
  getCityDetail,
  getCityActivities
} = require('../controllers/city.controller');

// All city routes are public
router.get('/', getCities);
router.get('/:id', getCityDetail);
router.get('/:id/activities', getCityActivities);

module.exports = router;
