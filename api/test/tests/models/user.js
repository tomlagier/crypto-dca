const { expect } = require('chai');
const { describe, it } = require('mocha');
const { User } = require('../../helpers/db');

describe('user model', () => {
  let user;
  before(async () => {
    await User.sync({ force: true });
    user = await User.create({
      username: 'Tester',
      password: 'Yerherp'
    });
  });

  it('should be able to create a new user', async () => {
    expect(user.username).to.equal('Tester');
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
})