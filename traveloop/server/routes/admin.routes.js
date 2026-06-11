const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/stats - Get dashboard stats
router.get('/stats', getDashboardStats);

// GET /api/admin/users - Get all users
router.get('/users', getAllUsers);

// PUT /api/admin/users/:userId/role - Update user role
router.put('/users/:userId/role', updateUserRole);

// DELETE /api/admin/users/:userId - Delete user
router.delete('/users/:userId', deleteUser);

module.exports = router;
