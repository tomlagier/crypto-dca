const { up, down } = require('../../helpers/db');
const { start, stop } = require('../../helpers/server');
const runFileMigration = require('../../helpers/run-file-migration');

let db, migrate;
module.exports = {
  async start(file = 'test-data.sql') {
    db = up();
    migrate = runFileMigration(file, db);
    await migrate.up();
    await start({ db });
  },
  async stop() {
    await migrate.down();
    await stop();
    await down();
  }
}