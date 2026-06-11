const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  region: {
    type: DataTypes.STRING(100),
    defaultValue: null
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  cost_index: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: null
  },
  popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  image_url: {
    type: DataTypes.STRING(255),
    defaultValue: null
  }
}, {
  tableName: 'cities',
  timestamps: true,
  underscored: true
});

module.exports = City;
