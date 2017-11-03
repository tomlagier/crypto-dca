const { expect } = require('chai');
const { describe, it, before } = require('mocha');
const { User, Coin, Wallet } = require('../../helpers/db');

describe('wallet model', () => {
  before(async () => {
    await User.sync({ force: true });
    await Wallet.sync({ force: true });
    await Coin.sync({ force: true });
  });

  it('should be able to create a wallet with a user', async () => {
    const user = await User.create({
      name: 'Test',
      password: 'Test'
    })
    const wallet = await Wallet.create({
      name: 'Bitcoin wallet',
      address: 'some address',
      local: false,
      UserId: user.id
    })
    expect(wallet.address).to.equal('some address');
    expect(wallet.name).to.equal('Bitcoin wallet');
    expect(wallet.local).to.be.false;

    const walletUser = await wallet.getUser();
    expect(walletUser.name).to.equal('Test');

    const [userWallet] = await walletUser.getWallets();
    expect(userWallet.address).to.equal('some address');
  });
});