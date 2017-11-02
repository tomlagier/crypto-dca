const { expect } = require('chai');
const { describe, it } = require('mocha');
const { User, Option } = require('../../helpers/db');

describe('option model', () => {
  it('should be able to create the table', done => {
    Option.sync({ force: true }).then(() => done())
  });

  it('should be able to create an option with a user', done => {
    User.create({
      username: 'Test',
      password: 'Test'
    })
    .then(user => Option.create({
      name: 'some option',
      value: 'some value',
      UserId: user.id
    }))
    .then(option => {
      expect(option.name).to.equal('some option');
      expect(option.value).to.equal('some value');
      return option.getUser();
    })
    .then(user => {
      expect(user.username).to.equal('Test');
      return user.getOptions();
    })
    .then(([option]) => {
      expect(option.name).to.equal('some option');
      done();
    })
  });
});