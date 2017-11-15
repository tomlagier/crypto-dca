const { expect } = require('chai');
const { describe, it, before, afterEach } = require('mocha');

describe('user model', () => {
  let User, db, user;
  before(async () => {
    db = require('../')();
    User = db.User;

    await User.sync({ force: true });
    user = await User.create({
      name: 'Tester',
      password: 'Yerherp'
    });
  });

  it('should be able to create a new user', async () => {
    expect(user.name).to.equal('Tester');
    expect(user.password).to.be.ok;
    expect(user.password).not.to.equal('Yerherp');
  });

  it('should be able to verify the new users password', async () => {
    const isValid = await user.checkPassword('Yerherp');
    expect(isValid).to.be.true;
  });

  it('should not verify an incorrect password', async () => {
    const isValid = await user.checkPassword('blargle');
    expect(isValid).to.be.false;
  })

  afterEach(async () => {
    return await user.destroy();
  })
})