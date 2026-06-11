const { User, Trip, City, CityActivity } = require('../models');

// Get dashboard stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [userCount, tripCount, cityCount, activityCount] = await Promise.all([
      User.count(),
      Trip.count(),
      City.count(),
      CityActivity.count()
    ]);
    
    const recentTrips = await Trip.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
    });
    
    res.json({
      success: true,
      data: {
        stats: {
          users: userCount,
          trips: tripCount,
          cities: cityCount,
          activities: activityCount
        },
        recentTrips
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'is_active', 'created_at'],
      order: [['created_at', 'DESC']]
    });
    
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// Update user role
exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role' });
    }
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    user.role = role;
    await user.save();
    
    res.json({ success: true, data: user, message: 'User role updated' });
  } catch (error) {
    next(error);
  }
};

// Delete user (hard delete for admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    await user.destroy();
    
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
