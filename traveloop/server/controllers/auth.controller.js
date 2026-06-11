const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../models');
const { success, error } = require('../utils/responseHelper');
const { generateToken, verifyToken } = require('../utils/jwtHelper');

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return error(res, 'Email already registered', 409);
    }

    // Hash password with bcrypt (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Return user data without password
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      language: user.language,
      avatar_url: user.avatar_url
    };

    return success(res, { user: userData, token }, 'Account created successfully', 201);
  } catch (err) {
    console.error('Register error:', err);
    throw err;
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    
    if (!user) {
      return error(res, 'Invalid email or password', 401);
    }

    // Check if user is active
    if (!user.is_active) {
      return error(res, 'Account has been deactivated. Please contact support.', 403);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return error(res, 'Invalid email or password', 401);
    }

    // Generate JWT token (30 days if rememberMe is true)
    const expiresIn = rememberMe ? '30d' : process.env.JWT_EXPIRES_IN || '7d';
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    }, expiresIn);

    // Return user data without password
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      language: user.language,
      avatar_url: user.avatar_url
    };

    return success(res, { user: userData, token }, 'Login successful');
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
};

/**
 * Get current logged-in user info
 */
const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'language', 'avatar_url', 'is_active', 'created_at']
    });

    if (!user) {
      return error(res, 'User not found', 404);
    }

    return success(res, { user }, 'User retrieved successfully');
  } catch (err) {
    console.error('Get me error:', err);
    throw err;
  }
};

/**
 * Forgot password - generate reset token (no email sending for hackathon)
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    
    if (!user) {
      // Don't reveal if email exists or not
      return success(res, { message: 'If the email exists, a reset token will be generated.' }, 'Request processed');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store reset token in DB (we'll add these fields to User model or use a separate table)
    // For simplicity, we'll store it temporarily
    user.reset_token = resetToken;
    user.reset_token_expiry = resetTokenExpiry;
    await user.save();

    // In production, send email here. For hackathon, just return the token
    return success(res, { 
      resetToken,
      message: 'Password reset token generated. Use this token to reset your password.',
      resetUrl: `http://localhost:5173/reset-password?token=${resetToken}`
    }, 'Reset token generated');
  } catch (err) {
    console.error('Forgot password error:', err);
    throw err;
  }
};

/**
 * Reset password with token
 */
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find user by reset token
    const user = await User.findOne({ 
      where: { 
        reset_token: token,
        reset_token_expiry: { [require('sequelize').Op.gte]: new Date() }
      }
    });

    if (!user) {
      return error(res, 'Invalid or expired reset token', 400);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.reset_token = null;
    user.reset_token_expiry = null;
    await user.save();

    return success(res, {}, 'Password reset successfully');
  } catch (err) {
    console.error('Reset password error:', err);
    throw err;
  }
};

/**
 * Logout (client-side token removal, but we can log it server-side if needed)
 */
const logout = async (req, res) => {
  // For stateless JWT, logout is mainly client-side (remove token from localStorage)
  // We could maintain a blacklist of tokens in Redis for true logout, but for hackathon:
  return success(res, {}, 'Logged out successfully');
};

module.exports = {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
  logout
};
