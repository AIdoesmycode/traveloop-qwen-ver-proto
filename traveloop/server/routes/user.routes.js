const express = require('express');
const router = express.Router();
const { User, Trip, SavedDestination, City } = require('../models');
const { success, error } = require('../utils/responseHelper');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * GET /api/users/:id - Get user profile
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'role', 'language', 'avatar_url', 'created_at'],
      include: [{
        model: Trip,
        as: 'trips',
        attributes: ['id', 'title', 'status']
      }]
    });

    if (!user) {
      return error(res, 'User not found', 404);
    }

    // Only allow users to view their own profile or admins
    if (user.id !== req.user.id && req.user.role !== 'admin') {
      return error(res, 'Access denied', 403);
    }

    return success(res, { user }, 'User profile retrieved successfully');
  } catch (err) {
    console.error('Get user error:', err);
    throw err;
  }
});

/**
 * PUT /api/users/:id - Update user profile
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, language } = req.body;

    // Only allow users to update their own profile or admins
    if (req.params.id != req.user.id && req.user.role !== 'admin') {
      return error(res, 'Access denied', 403);
    }

    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return error(res, 'User not found', 404);
    }

    if (name) user.name = name.trim();
    if (language) user.language = language;

    await user.save();

    const updatedUser = await User.findByPk(user.id, {
      attributes: ['id', 'name', 'email', 'role', 'language', 'avatar_url']
    });

    return success(res, { user: updatedUser }, 'Profile updated successfully');
  } catch (err) {
    console.error('Update user error:', err);
    throw err;
  }
});

/**
 * PUT /api/users/:id/avatar - Upload avatar
 */
router.put('/:id/avatar', authMiddleware, async (req, res) => {
  try {
    // Only allow users to update their own avatar or admins
    if (req.params.id != req.user.id && req.user.role !== 'admin') {
      return error(res, 'Access denied', 403);
    }

    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return error(res, 'User not found', 404);
    }

    if (req.file) {
      user.avatar_url = `/uploads/avatars/${req.file.filename}`;
      await user.save();
    }

    return success(res, { avatar_url: user.avatar_url }, 'Avatar uploaded successfully');
  } catch (err) {
    console.error('Upload avatar error:', err);
    throw err;
  }
});

/**
 * DELETE /api/users/:id - Delete account (soft delete by deactivating)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Only allow users to delete their own account or admins
    if (req.params.id != req.user.id && req.user.role !== 'admin') {
      return error(res, 'Access denied', 403);
    }

    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return error(res, 'User not found', 404);
    }

    user.is_active = false;
    await user.save();

    return success(res, {}, 'Account deleted successfully');
  } catch (err) {
    console.error('Delete user error:', err);
    throw err;
  }
});

/**
 * GET /api/users/:id/saved-destinations - Get saved cities
 */
router.get('/:id/saved-destinations', authMiddleware, async (req, res) => {
  try {
    if (req.params.id != req.user.id && req.user.role !== 'admin') {
      return error(res, 'Access denied', 403);
    }

    const user = await User.findByPk(req.params.id, {
      include: [{
        model: City,
        as: 'savedDestinations',
        through: { attributes: [] }
      }]
    });

    if (!user) {
      return error(res, 'User not found', 404);
    }

    return success(res, { savedDestinations: user.savedDestinations }, 'Saved destinations retrieved successfully');
  } catch (err) {
    console.error('Get saved destinations error:', err);
    throw err;
  }
});

/**
 * POST /api/users/:id/saved-destinations - Save a city
 */
router.post('/:id/saved-destinations', authMiddleware, async (req, res) => {
  try {
    if (req.params.id != req.user.id && req.user.role !== 'admin') {
      return error(res, 'Access denied', 403);
    }

    const { city_id } = req.body;

    if (!city_id) {
      return error(res, 'City ID is required', 400);
    }

    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return error(res, 'User not found', 404);
    }

    const city = await City.findByPk(city_id);
    
    if (!city) {
      return error(res, 'City not found', 404);
    }

    await user.addSavedDestination(city);

    return success(res, {}, 'Destination saved successfully');
  } catch (err) {
    console.error('Save destination error:', err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return error(res, 'Destination already saved', 409);
    }
    throw err;
  }
});

/**
 * DELETE /api/users/:id/saved-destinations/:cityId - Remove saved city
 */
router.delete('/:id/saved-destinations/:cityId', authMiddleware, async (req, res) => {
  try {
    if (req.params.id != req.user.id && req.user.role !== 'admin') {
      return error(res, 'Access denied', 403);
    }

    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return error(res, 'User not found', 404);
    }

    const city = await City.findByPk(req.params.cityId);
    
    if (!city) {
      return error(res, 'City not found', 404);
    }

    await user.removeSavedDestination(city);

    return success(res, {}, 'Destination removed successfully');
  } catch (err) {
    console.error('Remove destination error:', err);
    throw err;
  }
});

module.exports = router;
