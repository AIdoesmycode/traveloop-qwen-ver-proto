const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SavedDestination = sequelize.define('SavedDestination', {
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
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cities',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'saved_destinations',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'city_id']
    }
  ]
});

module.exports = SavedDestination;
