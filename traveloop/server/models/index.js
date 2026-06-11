const { sequelize } = require('../config/db');
const fs = require('fs');
const path = require('path');

// Load all model files dynamically
const modelsDir = __dirname;
const models = {};

fs.readdirSync(modelsDir)
  .filter(file => {
    return file !== 'index.js' && file.endsWith('.js');
  })
  .forEach(file => {
    const model = require(path.join(modelsDir, file));
    models[model.name] = model;
  });

// Define associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Manual associations for our models
const { User, Trip, Stop, City, CityActivity, StopActivity, PackingItem, TripNote, SavedDestination } = models;

// User associations
User.hasMany(Trip, { foreignKey: 'user_id', as: 'trips' });
Trip.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.belongsToMany(City, { 
  through: SavedDestination, 
  foreignKey: 'user_id', 
  otherKey: 'city_id',
  as: 'savedDestinations' 
});
City.belongsToMany(User, { 
  through: SavedDestination, 
  foreignKey: 'city_id', 
  otherKey: 'user_id',
  as: 'savedByUsers' 
});

// Trip associations
Trip.hasMany(Stop, { foreignKey: 'trip_id', as: 'stops', onDelete: 'CASCADE' });
Stop.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

Trip.hasMany(PackingItem, { foreignKey: 'trip_id', as: 'packingItems', onDelete: 'CASCADE' });
PackingItem.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

Trip.hasMany(TripNote, { foreignKey: 'trip_id', as: 'notes', onDelete: 'CASCADE' });
TripNote.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

// Stop associations
Stop.belongsTo(City, { foreignKey: 'city_id', as: 'city' });
Stop.hasMany(StopActivity, { foreignKey: 'stop_id', as: 'activities', onDelete: 'CASCADE' });
StopActivity.belongsTo(Stop, { foreignKey: 'stop_id', as: 'stop' });

Stop.hasMany(TripNote, { foreignKey: 'stop_id', as: 'stopNotes' });
TripNote.belongsTo(Stop, { foreignKey: 'stop_id', as: 'stop' });

// City associations
City.hasMany(CityActivity, { foreignKey: 'city_id', as: 'activities', onDelete: 'CASCADE' });
CityActivity.belongsTo(City, { foreignKey: 'city_id', as: 'city' });

City.hasMany(Stop, { foreignKey: 'city_id', as: 'stops' });

// StopActivity associations
StopActivity.belongsTo(CityActivity, { foreignKey: 'city_activity_id', as: 'cityActivity' });

module.exports = {
  sequelize,
  ...models
};
