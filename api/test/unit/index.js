const { describe, before, after } = require('mocha');
const testDir = require('../helpers/test-dir');
const { up } = require('../../helpers/db');
const runMigration = require('../helpers/migration');

let db, migrate;
describe('unit tests', () => {
  before(async () => {
    db = up()
    migrate = runMigration(db);
    await migrate.down();
  })

  testDir('unit/models');

  after(async () => {
    await migrate.down();
  })
});

module.exports = () => db;