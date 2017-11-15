const { describe, it, before } = require('mocha');

describe('db connection', () => {
  let db;
  before(() => {
    db = require('../')();
  })

  it('should be able to connect to the database', done => {
    db.sequelize.authenticate()
      .then(() => done());
  });
})