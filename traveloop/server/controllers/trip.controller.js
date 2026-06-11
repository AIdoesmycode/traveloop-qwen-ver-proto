const { Trip, Stop, City, StopActivity, PackingItem, TripNote } = require('../models');
const { success, error } = require('../utils/responseHelper');
const { calculateBudget } = require('../utils/budgetCalculator');

/**
 * GET /api/trips - Get all trips for logged-in user
 */
const getTrips = async (req, res) => {
  try {
    const { limit, sort, status } = req.query;
    
    let order = [['created_at', 'DESC']];
    if (sort === 'oldest') order = [['created_at', 'ASC']];
    if (sort === 'upcoming') order = [['start_date', 'ASC']];
    if (sort === 'completed') order = [['end_date', 'DESC']];

    const where = { user_id: req.user.id };
    if (status) where.status = status;

    const options = {
      where,
      order,
      include: [{
        model: Stop,
        as: 'stops',
        attributes: ['id', 'city_id', 'arrive_date', 'depart_date'],
        include: [{
          model: City,
          as: 'city',
          attributes: ['id', 'name', 'country']
        }]
      }]
    };

    if (limit) options.limit = parseInt(limit);

    const trips = await Trip.findAll(options);

    return success(res, { trips }, 'Trips retrieved successfully');
  } catch (err) {
    console.error('Get trips error:', err);
    throw err;
  }
};

/**
 * POST /api/trips - Create new trip
 */
const createTrip = async (req, res) => {
  try {
    const { title, description, start_date, end_date, total_budget, currency } = req.body;

    const tripData = {
      user_id: req.user.id,
      title: title.trim(),
      description: description?.trim() || null,
      start_date,
      end_date,
      total_budget: total_budget || 0,
      currency: currency || 'USD'
    };

    if (req.file) {
      tripData.cover_url = `/uploads/covers/${req.file.filename}`;
    }

    const trip = await Trip.create(tripData);

    const newTrip = await Trip.findByPk(trip.id, {
      include: [{
        model: Stop,
        as: 'stops',
        include: [{
          model: City,
          as: 'city'
        }]
      }]
    });

    return success(res, { trip: newTrip }, 'Trip created successfully', 201);
  } catch (err) {
    console.error('Create trip error:', err);
    throw err;
  }
};

/**
 * GET /api/trips/:id - Get trip detail with stops
 */
const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      },
      include: [{
        model: Stop,
        as: 'stops',
        order: [['order_index', 'ASC']],
        include: [
          {
            model: City,
            as: 'city'
          },
          {
            model: StopActivity,
            as: 'activities',
            include: [{
              model: require('../models').CityActivity,
              as: 'cityActivity'
            }]
          }
        ]
      }]
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    return success(res, { trip }, 'Trip retrieved successfully');
  } catch (err) {
    console.error('Get trip error:', err);
    throw err;
  }
};

/**
 * PUT /api/trips/:id - Update trip
 */
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      }
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    const { title, description, start_date, end_date, total_budget, currency, status } = req.body;

    if (title !== undefined) trip.title = title.trim();
    if (description !== undefined) trip.description = description?.trim() || null;
    if (start_date !== undefined) trip.start_date = start_date;
    if (end_date !== undefined) trip.end_date = end_date;
    if (total_budget !== undefined) trip.total_budget = total_budget;
    if (currency !== undefined) trip.currency = currency;
    if (status !== undefined) trip.status = status;

    if (req.file) {
      trip.cover_url = `/uploads/covers/${req.file.filename}`;
    }

    await trip.save();

    const updatedTrip = await Trip.findByPk(trip.id, {
      include: [{
        model: Stop,
        as: 'stops',
        include: [{
          model: City,
          as: 'city'
        }]
      }]
    });

    return success(res, { trip: updatedTrip }, 'Trip updated successfully');
  } catch (err) {
    console.error('Update trip error:', err);
    throw err;
  }
};

/**
 * DELETE /api/trips/:id - Delete trip
 */
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      }
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    await trip.destroy();

    return success(res, {}, 'Trip deleted successfully');
  } catch (err) {
    console.error('Delete trip error:', err);
    throw err;
  }
};

/**
 * PUT /api/trips/:id/cover - Upload cover photo
 */
const uploadCover = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      }
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    if (!req.file) {
      return error(res, 'No file uploaded', 400);
    }

    trip.cover_url = `/uploads/covers/${req.file.filename}`;
    await trip.save();

    return success(res, { cover_url: trip.cover_url }, 'Cover photo uploaded successfully');
  } catch (err) {
    console.error('Upload cover error:', err);
    throw err;
  }
};

/**
 * POST /api/trips/:id/share - Generate/toggle public share token
 */
const toggleShare = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      }
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    const crypto = require('crypto');

    if (trip.is_public && trip.share_token) {
      // Make private
      trip.is_public = false;
      trip.share_token = null;
    } else {
      // Make public
      trip.is_public = true;
      if (!trip.share_token) {
        trip.share_token = crypto.randomBytes(32).toString('hex');
      }
    }

    await trip.save();

    return success(res, { 
      is_public: trip.is_public, 
      share_token: trip.share_token,
      share_url: trip.share_token ? `http://localhost:5173/share/${trip.share_token}` : null
    }, trip.is_public ? 'Trip is now public' : 'Trip is now private');
  } catch (err) {
    console.error('Toggle share error:', err);
    throw err;
  }
};

/**
 * GET /api/trips/:id/export - Export itinerary as JSON
 */
const exportTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      },
      include: [{
        model: Stop,
        as: 'stops',
        order: [['order_index', 'ASC']],
        include: [
          {
            model: City,
            as: 'city',
            attributes: ['name', 'country']
          },
          {
            model: StopActivity,
            as: 'activities'
          }
        ]
      }]
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    return success(res, { trip }, 'Trip exported successfully');
  } catch (err) {
    console.error('Export trip error:', err);
    throw err;
  }
};

/**
 * GET /api/trips/:id/budget - Get budget breakdown
 */
const getBudget = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      }
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    const budget = await calculateBudget(req.params.id);

    return success(res, budget, 'Budget retrieved successfully');
  } catch (err) {
    console.error('Get budget error:', err);
    throw err;
  }
};

/**
 * PUT /api/trips/:id/budget - Update trip budget cap
 */
const updateBudget = async (req, res) => {
  try {
    const { total_budget } = req.body;

    const trip = await Trip.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      }
    });

    if (!trip) {
      return error(res, 'Trip not found', 404);
    }

    trip.total_budget = total_budget;
    await trip.save();

    const budget = await calculateBudget(req.params.id);

    return success(res, budget, 'Budget updated successfully');
  } catch (err) {
    console.error('Update budget error:', err);
    throw err;
  }
};

module.exports = {
  getTrips,
  createTrip,
  getTrip,
  updateTrip,
  deleteTrip,
  uploadCover,
  toggleShare,
  exportTrip,
  getBudget,
  updateBudget
};
