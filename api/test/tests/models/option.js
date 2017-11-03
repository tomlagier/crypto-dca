const { expect } = require('chai');
const { describe, it } = require('mocha');
const { User, Option } = require('../../helpers/db');

describe('option model', () => {
  before(async () => {
    await Option.sync({ force: true });
  });

  it('should be able to create an option with a user', async () => {
    const user = await User.create({
      username: 'Test',
      password: 'Test'
    })

    const option = await Option.create({
      name: 'some option',
      value: 'some value',
      UserId: user.id
    })

    expect(option.name).to.equal('some option');
    expect(option.value).to.equal('some value');

    const optionUser = await option.getUser();
    expect(optionUser.username).to.equal('Test');

    const [userOption] = await user.getOptions();
    expect(userOption.name).to.equal('some option');
  });
});