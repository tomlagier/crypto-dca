const { describe, it, before, after } = require('mocha');
const { up, down } = require('../../helpers/db');

describe('db connection', () => {
  let db;
  before(() => {
    db = up();
  })

  it('should be able to connect to the database', done => {
    db.sequelize.authenticate()
      .then(() => done());
  });

  after(() => {
    down();
  })
})