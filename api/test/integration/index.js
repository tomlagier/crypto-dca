const { describe, before, after} = require('mocha');
const { up } = require('../../helpers/db');
const { start, stop } = require('../../helpers/server');
const testDir = require('../helpers/test-dir');
const runMigration = require('../helpers/migration');

let db, migrate;
describe('integration tests', () => {
  before(async () => {
    db = up();
    migrate = runMigration(db);
    await migrate.down();
    await migrate.up();
    await start({ db });
  });

  [
    'db',
    'auth',
    'graphql',
    'rpc'
  ].forEach(dir =>
    testDir(`integration/${dir}`)
  )

  after(async () => {
    await migrate.down();
    await stop();
  });
})

module.exports = () => db;