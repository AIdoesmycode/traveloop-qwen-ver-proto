const { City, CityActivity } = require('../models');
const { Op } = require('sequelize');

// List/search cities
exports.getCities = async (req, res, next) => {
  try {
    const { query, country, region, min_popularity, limit = 50 } = req.query;
    
    const where = {};
    
    if (query) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${query}%` } },
        { country: { [Op.iLike]: `%${query}%` } }
      ];
    }
    if (country) where.country = country;
    if (region) where.region = region;
    if (min_popularity) where.popularity = { [Op.gte]: min_popularity };
    
    const cities = await City.findAll({
      where,
      limit: parseInt(limit),
      order: [['popularity', 'DESC']]
    });
    
    res.json({ success: true, data: cities });
  } catch (error) {
    next(error);
  }
};

// Get city detail
exports.getCityDetail = async (req, res, next) => {
  try {
    const city = await City.findByPk(req.params.id, {
      include: [{ model: CityActivity, as: 'activities' }]
    });
    
    if (!city) {
      return res.status(404).json({ success: false, error: 'City not found' });
    }
    
    res.json({ success: true, data: city });
  } catch (error) {
    next(error);
  }
};

// Get activities for a city
exports.getCityActivities = async (req, res, next) => {
  try {
    const activities = await CityActivity.findAll({
      where: { city_id: req.params.id }
    });
    
    res.json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};
