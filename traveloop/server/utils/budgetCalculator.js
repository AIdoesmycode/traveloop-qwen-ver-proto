const { Op } = require('sequelize');
const { Stop, StopActivity, PackingItem, TripNote } = require('../models');

/**
 * Calculate budget breakdown for a trip
 * @param {number} tripId - The trip ID
 * @returns {Promise<Object>} Budget breakdown object
 */
const calculateBudget = async (tripId) => {
  // Get all stops for the trip
  const stops = await Stop.findAll({
    where: { trip_id: tripId },
    include: [{
      model: StopActivity,
      as: 'activities',
      attributes: ['custom_cost', 'est_cost']
    }],
    attributes: ['id', 'city_id', 'est_stay_cost', 'arrive_date', 'depart_date']
  });

  let totalEstimated = 0;
  let breakdownByStop = [];
  let breakdownByCategory = {
    activities: 0,
    accommodation: 0,
    other: 0
  };

  // Calculate costs per stop
  for (const stop of stops) {
    const stopActivitiesCost = stop.activities.reduce((sum, activity) => {
      return sum + (parseFloat(activity.custom_cost) || parseFloat(activity.est_cost) || 0);
    }, 0);

    const stayCost = parseFloat(stop.est_stay_cost) || 0;
    const stopTotal = stopActivitiesCost + stayCost;

    totalEstimated += stopTotal;
    breakdownByCategory.activities += stopActivitiesCost;
    breakdownByCategory.accommodation += stayCost;

    // Get city name
    const city = await stop.getCity();
    
    // Calculate days for this stop
    const arriveDate = new Date(stop.arrive_date);
    const departDate = new Date(stop.depart_date);
    const days = Math.ceil((departDate - arriveDate) / (1000 * 60 * 60 * 24));

    breakdownByStop.push({
      city: city ? city.name : 'Unknown',
      activities: stopActivitiesCost,
      accommodation: stayCost,
      total: stopTotal,
      days: days
    });
  }

  // Get trip details
  const Trip = require('../models').Trip;
  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    throw new Error('Trip not found');
  }

  const totalBudget = parseFloat(trip.total_budget) || 0;
  const remaining = totalBudget - totalEstimated;
  const isOverBudget = totalEstimated > totalBudget;

  // Calculate trip duration
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const tripDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
  const avgCostPerDay = totalEstimated / tripDuration;

  return {
    totalBudget,
    totalEstimated: Math.round(totalEstimated * 100) / 100,
    remaining: Math.round(remaining * 100) / 100,
    isOverBudget,
    breakdownByStop,
    breakdownByCategory: {
      activities: Math.round(breakdownByCategory.activities * 100) / 100,
      accommodation: Math.round(breakdownByCategory.accommodation * 100) / 100,
      other: Math.round(breakdownByCategory.other * 100) / 100
    },
    avgCostPerDay: Math.round(avgCostPerDay * 100) / 100
  };
};

module.exports = {
  calculateBudget
};
