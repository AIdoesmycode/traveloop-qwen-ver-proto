const { Stop, Trip, City, StopActivity, CityActivity } = require('../models');
const { Op } = require('sequelize');

// Get all stops for a trip
exports.getStops = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    
    const stops = await Stop.findAll({
      where: { trip_id: tripId },
      include: [
        { model: City, as: 'city' },
        { model: StopActivity, as: 'activities', include: [{ model: CityActivity, as: 'cityActivity' }] }
      ],
      order: [['order_index', 'ASC']]
    });
    
    res.json({ success: true, data: stops });
  } catch (error) {
    next(error);
  }
};

// Add stop to trip
exports.addStop = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { city_id, arrive_date, depart_date, notes } = req.body;
    
    // Get the highest order_index
    const lastStop = await Stop.findOne({
      where: { trip_id: tripId },
      order: [['order_index', 'DESC']]
    });
    
    const order_index = lastStop ? lastStop.order_index + 1 : 0;
    
    const stop = await Stop.create({
      trip_id: tripId,
      city_id,
      arrive_date,
      depart_date,
      notes: notes || null,
      order_index
    });
    
    const createdStop = await Stop.findByPk(stop.id, {
      include: [{ model: City, as: 'city' }]
    });
    
    res.status(201).json({ success: true, data: createdStop, message: 'Stop added successfully' });
  } catch (error) {
    next(error);
  }
};

// Update stop
exports.updateStop = async (req, res, next) => {
  try {
    const { stopId } = req.params;
    const { arrive_date, depart_date, notes } = req.body;
    
    const stop = await Stop.findByPk(stopId);
    if (!stop) {
      return res.status(404).json({ success: false, error: 'Stop not found' });
    }
    
    if (arrive_date) stop.arrive_date = arrive_date;
    if (depart_date) stop.depart_date = depart_date;
    if (notes !== undefined) stop.notes = notes;
    
    await stop.save();
    
    const updatedStop = await Stop.findByPk(stopId, {
      include: [{ model: City, as: 'city' }]
    });
    
    res.json({ success: true, data: updatedStop, message: 'Stop updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete stop
exports.deleteStop = async (req, res, next) => {
  try {
    const { stopId } = req.params;
    
    const stop = await Stop.findByPk(stopId);
    if (!stop) {
      return res.status(404).json({ success: false, error: 'Stop not found' });
    }
    
    await stop.destroy();
    
    res.json({ success: true, message: 'Stop deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Reorder stops
exports.reorderStops = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { stopIds } = req.body; // Array of stop IDs in new order
    
    if (!Array.isArray(stopIds)) {
      return res.status(400).json({ success: false, error: 'stopIds must be an array' });
    }
    
    const transaction = await Stop.sequelize.transaction();
    
    try {
      for (let i = 0; i < stopIds.length; i++) {
        await Stop.update(
          { order_index: i },
          { where: { id: stopIds[i], trip_id: tripId } },
          { transaction }
        );
      }
      
      await transaction.commit();
      
      const stops = await Stop.findAll({
        where: { trip_id: tripId },
        include: [{ model: City, as: 'city' }],
        order: [['order_index', 'ASC']]
      });
      
      res.json({ success: true, data: stops, message: 'Stops reordered successfully' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
