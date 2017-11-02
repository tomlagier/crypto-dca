const { expect } = require('chai');
const { describe, it } = require('mocha');
const db = require('../../helpers/db');

describe('db connection', () => {
  it('should be able to connect to the database', done => {
    db.sequelize.authenticate()
      .then(() => done());
  });
})