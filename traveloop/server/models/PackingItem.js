const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PackingItem = sequelize.define('PackingItem', {
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
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('clothing', 'documents', 'electronics', 'toiletries', 'medicine', 'food', 'other'),
    defaultValue: 'other'
  },
  is_packed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'packing_items',
  timestamps: true,
  underscored: true
});

module.exports = PackingItem;
