process.env.NODE_ENV = 'test';
const buildDb = require('../../helpers/build-db');
const decorateDb = require('../../helpers/decorate-db');

module.exports = {
  up: () => {
    return this.db = decorateDb(buildDb());
  },
  down: () => {
    this.db.sequelize.close();
  },
  db: null
};