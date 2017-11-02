const { expect } = require('chai');
const { describe, it } = require('mocha');
const { User } = require('../../helpers/db');

describe('user model', () => {
  it('should be able to create the table', done => {
    User.sync({ force: true })
      .then(() => done())
  });

  it('should be able to create a new user', done => {
    User.create({
      username: 'Tester',
      password: 'Yerherp'
    })
      .then(user => {
        expect(user.username).to.equal('Tester');
        expect(user.password).to.be.ok;
        expect(user.password).not.to.equal('Yerherp');
        done();
      })
  });

  it('should be able to verify the new users password', done => {
    User.create({
      username: 'Tester2',
      password: 'Yerherp2'
    })
      .then(user => user.checkPassword('Yerherp2'))
      .then(resp => {
        expect(resp).to.be.true;
        done();
      });
  })

  it('should not verify an incorrect password', done => {
    User.create({
      username: 'Tester3',
      password: 'Yerherp3'
    })
      .then(user => user.checkPassword('blargle'))
      .catch(err => {
        expect(err).to.be.false;
        done();
      })
  })
})