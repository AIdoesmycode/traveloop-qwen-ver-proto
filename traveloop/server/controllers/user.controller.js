const { User, SavedDestination, City } = require('../models');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_url', 'role', 'language', 'created_at']
    });
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, language } = req.body;
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    if (name) user.name = name;
    if (language) user.language = language;
    
    await user.save();
    
    res.json({ success: true, data: user, message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    // Delete old avatar if exists
    if (user.avatar_url) {
      const oldPath = path.join(__dirname, '..', user.avatar_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    user.avatar_url = avatarUrl;
    await user.save();
    
    res.json({ success: true, data: { avatar_url: avatarUrl }, message: 'Avatar uploaded successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete account (soft delete)
exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    user.is_active = false;
    await user.save();
    
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get saved destinations
exports.getSavedDestinations = async (req, res, next) => {
  try {
    const destinations = await SavedDestination.findAll({
      where: { user_id: req.params.id },
      include: [{ model: City, as: 'city' }]
    });
    
    res.json({ success: true, data: destinations });
  } catch (error) {
    next(error);
  }
};

// Save a destination
exports.saveDestination = async (req, res, next) => {
  try {
    const { city_id } = req.body;
    
    const [destination, created] = await SavedDestination.findOrCreate({
      where: { user_id: req.params.id, city_id }
    });
    
    if (!created) {
      return res.status(400).json({ success: false, error: 'Destination already saved' });
    }
    
    res.status(201).json({ success: true, data: destination, message: 'Destination saved' });
  } catch (error) {
    next(error);
  }
};

// Remove saved destination
exports.removeSavedDestination = async (req, res, next) => {
  try {
    const deleted = await SavedDestination.destroy({
      where: { user_id: req.params.id, city_id: req.params.cityId }
    });
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Saved destination not found' });
    }
    
    res.json({ success: true, message: 'Destination removed' });
  } catch (error) {
    next(error);
  }
};
