const { expect } = require('chai');
const { describe, it, before, beforeEach, afterEach } = require('mocha');

describe('option model', () => {
  let User, Option, db;
  before(async () => {
    db = require('../setup')();
    User = db.User;
    Option = db.Option;

    await Option.sync({ force: true });
  });

  let user, option
  beforeEach(async () => {
    user = await User.create({
      name: 'Test',
      password: 'Test'
    })

    option = await Option.create({
      name: 'some option',
      value: 'some value',
      UserId: user.id
    })
  })

  it('should be able to create an option with a user', async () => {
    expect(option.name).to.equal('some option');
    expect(option.value).to.equal('some value');

    const optionUser = await option.getUser();
    expect(optionUser.name).to.equal('Test');

    const [userOption] = await user.getOptions();
    expect(userOption.name).to.equal('some option');
  });

  afterEach(async () => {
    return await user.destroy();
  })
});