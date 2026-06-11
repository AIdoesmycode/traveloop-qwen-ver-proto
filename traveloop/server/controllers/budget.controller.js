const { Trip, Stop, StopActivity, CityActivity } = require('../models');
const { calculateBudget } = require('../utils/budgetCalculator');

// Get budget breakdown for a trip
exports.getBudget = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    
    const stops = await Stop.findAll({
      where: { trip_id: tripId },
      include: [{
        model: StopActivity,
        as: 'activities',
        include: [{ model: CityActivity, as: 'cityActivity' }]
      }]
    });
    
    const budgetData = calculateBudget(trip, stops);
    
    res.json({ success: true, data: budgetData });
  } catch (error) {
    next(error);
  }
};

// Update trip budget
exports.updateBudget = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { total_budget } = req.body;
    
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    
    trip.total_budget = total_budget;
    await trip.save();
    
    // Recalculate budget
    const stops = await Stop.findAll({
      where: { trip_id: tripId },
      include: [{
        model: StopActivity,
        as: 'activities',
        include: [{ model: CityActivity, as: 'cityActivity' }]
      }]
    });
    
    const budgetData = calculateBudget(trip, stops);
    
    res.json({ success: true, data: budgetData, message: 'Budget updated successfully' });
  } catch (error) {
    next(error);
  }
};
