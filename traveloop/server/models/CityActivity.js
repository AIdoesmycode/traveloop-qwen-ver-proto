const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CityActivity = sequelize.define('CityActivity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cities',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('sightseeing', 'food', 'adventure', 'culture', 'shopping', 'nightlife', 'nature', 'wellness'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  est_duration: {
    type: DataTypes.FLOAT,
    defaultValue: null
  },
  est_cost: {
    type: DataTypes.DECIMAL(8, 2),
    defaultValue: 0
  },
  image_url: {
    type: DataTypes.STRING(255),
    defaultValue: null
  }
}, {
  tableName: 'city_activities',
  timestamps: true,
  underscored: true
});

module.exports = CityActivity;
