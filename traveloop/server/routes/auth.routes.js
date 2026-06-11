const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth.validator');
const validateMiddleware = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/auth/register - Register new user
router.post('/register', registerValidator, validateMiddleware, authController.register);

// POST /api/auth/login - Login user
router.post('/login', loginValidator, validateMiddleware, authController.login);

// POST /api/auth/logout - Logout user
router.post('/logout', authMiddleware, authController.logout);

// GET /api/auth/me - Get current user info
router.get('/me', authMiddleware, authController.me);

// POST /api/auth/forgot-password - Generate reset token
router.post('/forgot-password', forgotPasswordValidator, validateMiddleware, authController.forgotPassword);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', resetPasswordValidator, validateMiddleware, authController.resetPassword);

module.exports = router;
