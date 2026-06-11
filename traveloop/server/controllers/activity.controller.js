const { StopActivity, CityActivity, Stop } = require('../models');

// Get activities for a stop
exports.getStopActivities = async (req, res, next) => {
  try {
    const { stopId } = req.params;
    
    const activities = await StopActivity.findAll({
      where: { stop_id: stopId },
      include: [{ model: CityActivity, as: 'cityActivity' }]
    });
    
    res.json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};

// Add activity to stop
exports.addActivityToStop = async (req, res, next) => {
  try {
    const { stopId } = req.params;
    const { city_activity_id, custom_name, custom_cost, custom_duration, scheduled_date, scheduled_time, notes } = req.body;
    
    const activity = await StopActivity.create({
      stop_id: stopId,
      city_activity_id: city_activity_id || null,
      custom_name: custom_name || null,
      custom_cost: custom_cost || null,
      custom_duration: custom_duration || null,
      scheduled_date: scheduled_date || null,
      scheduled_time: scheduled_time || null,
      notes: notes || null
    });
    
    const createdActivity = await StopActivity.findByPk(activity.id, {
      include: [{ model: CityActivity, as: 'cityActivity' }]
    });
    
    res.status(201).json({ success: true, data: createdActivity, message: 'Activity added successfully' });
  } catch (error) {
    next(error);
  }
};

// Update activity
exports.updateActivity = async (req, res, next) => {
  try {
    const { actId } = req.params;
    const { scheduled_date, scheduled_time, notes, custom_cost, custom_duration } = req.body;
    
    const activity = await StopActivity.findByPk(actId);
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }
    
    if (scheduled_date) activity.scheduled_date = scheduled_date;
    if (scheduled_time) activity.scheduled_time = scheduled_time;
    if (notes !== undefined) activity.notes = notes;
    if (custom_cost !== undefined) activity.custom_cost = custom_cost;
    if (custom_duration !== undefined) activity.custom_duration = custom_duration;
    
    await activity.save();
    
    const updatedActivity = await StopActivity.findByPk(actId, {
      include: [{ model: CityActivity, as: 'cityActivity' }]
    });
    
    res.json({ success: true, data: updatedActivity, message: 'Activity updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete activity from stop
exports.deleteActivity = async (req, res, next) => {
  try {
    const { actId } = req.params;
    
    const activity = await StopActivity.findByPk(actId);
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }
    
    await activity.destroy();
    
    res.json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Search activities (global search)
exports.searchActivities = async (req, res, next) => {
  try {
    const { category, city_id, min_cost, max_cost, min_duration, max_duration } = req.query;
    
    const where = {};
    if (category) where.category = category;
    if (city_id) where.city_id = city_id;
    if (min_cost || max_cost) {
      where.est_cost = {};
      if (min_cost) where.est_cost[Op.gte] = min_cost;
      if (max_cost) where.est_cost[Op.lte] = max_cost;
    }
    
    const activities = await CityActivity.findAll({
      where,
      include: [{ model: City, as: 'city' }]
    });
    
    res.json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};

// Get single activity detail
exports.getActivityDetail = async (req, res, next) => {
  try {
    const activity = await CityActivity.findByPk(req.params.id, {
      include: [{ model: City, as: 'city' }]
    });
    
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }
    
    res.json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};
