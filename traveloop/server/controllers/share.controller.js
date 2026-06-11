const { Trip } = require('../models');
const crypto = require('crypto');

// Generate/toggle public share token
exports.shareTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    
    // Toggle is_public and generate/update share_token
    trip.is_public = !trip.is_public;
    
    if (trip.is_public) {
      trip.share_token = crypto.randomBytes(32).toString('hex');
    } else {
      trip.share_token = null;
    }
    
    await trip.save();
    
    const shareUrl = trip.is_public 
      ? `${process.env.FRONTEND_URL || 'http://localhost:5173'}/share/${trip.share_token}`
      : null;
    
    res.json({ 
      success: true, 
      data: { 
        is_public: trip.is_public, 
        share_token: trip.share_token,
        share_url: shareUrl 
      },
      message: trip.is_public ? 'Trip shared successfully' : 'Trip sharing disabled'
    });
  } catch (error) {
    next(error);
  }
};

// Get public trip by share token
exports.getPublicTrip = async (req, res, next) => {
  try {
    const { token } = req.params;
    
    const trip = await Trip.findOne({
      where: { share_token: token, is_public: true },
      include: [{
        model: Stop,
        as: 'stops',
        include: [
          { model: City, as: 'city' },
          { 
            model: StopActivity, 
            as: 'activities',
            include: [{ model: CityActivity, as: 'cityActivity' }]
          }
        ]
      }]
    });
    
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found or not public' });
    }
    
    // Return only public-safe data
    const publicData = {
      id: trip.id,
      title: trip.title,
      description: trip.description,
      cover_url: trip.cover_url,
      start_date: trip.start_date,
      end_date: trip.end_date,
      stops: trip.stops
    };
    
    res.json({ success: true, data: publicData });
  } catch (error) {
    next(error);
  }
};

// Export itinerary as JSON
exports.exportItinerary = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    
    const trip = await Trip.findByPk(tripId, {
      include: [{
        model: Stop,
        as: 'stops',
        include: [
          { model: City, as: 'city' },
          { 
            model: StopActivity, 
            as: 'activities',
            include: [{ model: CityActivity, as: 'cityActivity' }]
          }
        ],
        order: [['order_index', 'ASC']]
      }]
    });
    
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    
    const exportData = {
      trip: {
        id: trip.id,
        title: trip.title,
        description: trip.description,
        start_date: trip.start_date,
        end_date: trip.end_date,
        total_budget: trip.total_budget,
        currency: trip.currency
      },
      stops: trip.stops.map(stop => ({
        city: stop.city.name,
        country: stop.city.country,
        arrive_date: stop.arrive_date,
        depart_date: stop.depart_date,
        notes: stop.notes,
        activities: stop.activities.map(act => ({
          name: act.cityActivity?.name || act.custom_name,
          category: act.cityActivity?.category || 'custom',
          scheduled_date: act.scheduled_date,
          scheduled_time: act.scheduled_time,
          cost: act.cityActivity?.est_cost || act.custom_cost,
          duration: act.cityActivity?.est_duration || act.custom_duration
        }))
      }))
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="itinerary-${trip.id}.json"`);
    res.json({ success: true, data: exportData });
  } catch (error) {
    next(error);
  }
};
