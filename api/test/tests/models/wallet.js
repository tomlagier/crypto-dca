const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const { up, down } = require('../../../helpers/db');

describe('wallet model', () => {
  let User, Coin, Wallet, db;
  before(async () => {
    db = up();
    User = db.User;
    Coin = db.Coin;
    Wallet = db.Wallet;

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

  after(async () => {
    await down();
  })
});