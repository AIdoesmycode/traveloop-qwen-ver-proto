const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StopActivity = sequelize.define('StopActivity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'stops',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  city_activity_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'city_activities',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  custom_name: {
    type: DataTypes.STRING(200),
    defaultValue: null
  },
  custom_cost: {
    type: DataTypes.DECIMAL(8, 2),
    defaultValue: null
  },
  custom_duration: {
    type: DataTypes.FLOAT,
    defaultValue: null
  },
  scheduled_date: {
    type: DataTypes.DATEONLY,
    defaultValue: null
  },
  scheduled_time: {
    type: DataTypes.TIME,
    defaultValue: null
  },
  notes: {
    type: DataTypes.TEXT,
    defaultValue: null
  }
}, {
  tableName: 'stop_activities',
  timestamps: true,
  underscored: true
});

module.exports = StopActivity;
