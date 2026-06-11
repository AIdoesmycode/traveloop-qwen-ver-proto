const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Trip = sequelize.define('Trip', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  cover_url: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total_budget: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'USD'
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  share_token: {
    type: DataTypes.STRING(64),
    unique: true,
    defaultValue: null
  },
  status: {
    type: DataTypes.ENUM('planning', 'ongoing', 'completed'),
    defaultValue: 'planning'
  }
}, {
  tableName: 'trips',
  timestamps: true,
  underscored: true
});

module.exports = Trip;
