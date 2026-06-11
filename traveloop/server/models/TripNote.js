const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TripNote = sequelize.define('TripNote', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'trips',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  stop_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'stops',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'trip_notes',
  timestamps: true,
  underscored: true
});

module.exports = TripNote;
