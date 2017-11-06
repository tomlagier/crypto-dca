var env       = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.js')[env];
var Sequelize = require('sequelize');

module.exports = function () {
  return config.use_env_variable ?
    new Sequelize(process.env[config.use_env_variable]) :
    new Sequelize(config.database, config.username, config.password, config);
}