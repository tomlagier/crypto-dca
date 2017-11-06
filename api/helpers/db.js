const buildDb = require('./build-db');
const decorateDb = require('./decorate-db');

module.exports = {
  up: () => {
    return this.db ?
      this.db :
      this.db = decorateDb(buildDb());
  },
  down: async () => {
    await this.db.sequelize.close();
    this.db = null;
  },
  db: null
};