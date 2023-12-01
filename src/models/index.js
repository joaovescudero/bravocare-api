const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const database = require('../lib/database');

const { DataTypes } = Sequelize;
const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require, security/detect-non-literal-require
    const model = require(path.join(__dirname, file))(database, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.database = database;
db.sequelize = database;
db.Sequelize = Sequelize;

// relationships for models
db.Shift.belongsTo(db.Facility, { as: 'facility', foreignKey: 'facility_id' });
db.Facility.hasMany(db.Shift, { as: 'shifts', foreignKey: 'facility_id' });

module.exports = db;
