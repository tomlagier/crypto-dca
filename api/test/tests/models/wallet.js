const { expect } = require('chai');
const { describe, it, before, beforeEach, afterEach } = require('mocha');

describe('wallet model', () => {
  let User, Coin, Wallet, db;
  before(async () => {
    db = require('../setup')();
    User = db.User;
    Coin = db.Coin;
    Wallet = db.Wallet;

    await User.sync({ force: true });
    await Wallet.sync({ force: true });
    await Coin.sync({ force: true });
  });

  let user, wallet
  beforeEach(async () => {
    user = await User.create({
      name: 'Test',
      password: 'Test'
    })
    wallet = await Wallet.create({
      name: 'Bitcoin wallet',
      address: 'some address',
      local: false,
      UserId: user.id
    })
  })

  it('should be able to create a wallet with a user', async () => {
    expect(wallet.address).to.equal('some address');
    expect(wallet.name).to.equal('Bitcoin wallet');
    expect(wallet.local).to.be.false;

    const walletUser = await wallet.getUser();
    expect(walletUser.name).to.equal('Test');

    const [userWallet] = await walletUser.getWallets();
    expect(userWallet.address).to.equal('some address');
  });

  afterEach(async () => {
    return await user.destroy();
  })
});