const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Stop = sequelize.define('Stop', {
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
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cities',
      key: 'id'
    }
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  arrive_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  depart_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  est_stay_cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  tableName: 'stops',
  timestamps: true,
  underscored: true
});

module.exports = Stop;
