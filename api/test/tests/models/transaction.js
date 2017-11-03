const { expect } = require('chai');
const { describe, it, before, beforeEach } = require('mocha');
const {
  User,
  Coin,
  Transaction,
  Wallet
 } = require('../../helpers/db');

describe('user model', () => {
  before(async () => {
    await User.sync({ force: true });
    await Wallet.sync({ force: true });
    await Coin.sync({ force: true });
    await Transaction.sync({ force: true });
  });

  let transaction;
  beforeEach(async () => {
    const [
      startCoin,
      endCoin,
      startWallet,
      endWallet
    ] = await Promise.all([
      Coin.create({
        name: 'tether',
        code: 'USDT'
      }),
      Coin.create({
        name: 'bitcoin',
        code: 'BTC'
      }),
      Wallet.create({
        name: 'remote tether',
        address: 'abcde',
        local: false
      }),
      Wallet.create({
        name: 'remote bitcoin',
        address: 'abcde',
        local: false
      })
    ]);

    transaction = await Transaction.create({
      startAmout: '20',
      endAmount: '0.0001',
      success: true,
      startCoinId: startCoin.id,
      endCoinId: endCoin.id,
      startWalletId: startWallet.id,
      endWalletId: endWallet.id
    });
  });

  it('should be able to create a new transaction', async () => {
    expect(transaction.startAmout).to.equal('20');
    expect(transaction.endAmount).to.equal('0.0001');
    expect(transaction.success).to.be.true;

    const [
      startCoin,
      endCoin,
      startWallet,
      endWallet
    ] = await Promise.all([
      transaction.getStartCoin(),
      transaction.getEndCoin(),
      transaction.getStartWallet(),
      transaction.getEndWallet()
    ]);

    expect(startCoin.code).to.equal('USDT');
    expect(endCoin.code).to.equal('BTC');
    expect(startWallet.name).to.equal('remote tether');
    expect(endWallet.name).to.equal('remote bitcoin');
  });
})