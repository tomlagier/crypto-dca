const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const modelPath = path.join(__dirname, '../models');

module.exports = function (sequelize) {
  const db = {};
  fs
    .readdirSync(modelPath)
    .filter(file => {
      return file.indexOf('.') === -1
    })
    .forEach(folder => {
      const model = sequelize['import'](path.join(modelPath, folder, 'index.js'));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}