module.exports = db => ({
  up: async () => {
    const {
      User,
      Transaction,
      Wallet,
      Coin,
      Option
    } = db;

    await User.sync();
    await Wallet.sync();
    await Option.sync();
    await Coin.sync();
    await Transaction.sync();

    const [user] = await User.bulkCreate([
      {
        name: 'tomlagier',
        password: 'test-password'
      },
      {
        name: 'marylagier',
        password: 'test-password-2'
      }
    ])

    const [
      localBtc,
      remoteBtc,
      remoteUsdt
    ] = await Wallet.bulkCreate([
      {
        name: 'local BTC',
        address: 'abacadsf',
        local: true,
        UserId: user.id
      },
      {
        name: 'remote BTC',
        address: 'asdfdcvzdsfasd',
        local: false,
        UserId: user.id
      },
      {
        name: 'remote USDT',
        address: 'vczvsadf',
        local: false,
        UserId: user.id
      }
    ])

    await Option.bulkCreate([
      {
        name: 'invest_interval',
        value: '100',
        UserId: user.id
      },
      {
        name: 'auto_rebalance',
        value: 'true',
        UserId: user.id
      }
    ])

    const [btc, usdt] = await Coin.bulkCreate([
      {
        feeTolerance: '0',
        name: 'BitCoin',
        code: 'BTC',
        active: true,
        portfolioWeight: 50,
        localAmount: '3.341',
        exchangeAmount: '0.023',
        purchaseAmount: '0.001',
        UserId: user.id,
        localWalletId: localBtc.id,
        exchangeWalletId: remoteBtc.id
      },
      {
        feeTolerance: '0',
        name: 'Tether',
        code: 'USDT',
        active: true,
        portfolioWeight: 0,
        localAmount: '0',
        exchangeAmount: '524',
        purchaseAmount: '0',
        UserId: user.id,
        exchangeWalletId: remoteUsdt.id,
      }
    ])

    return await Transaction.bulkCreate([
      {
        startAmount: '500',
        endAmount: '0.153',
        success: true,
        UserId: user.id,
        startWalletId: remoteUsdt.id,
        endWalletId: remoteBtc.id,
        startCoinId: usdt.id,
        endCoinId: btc.id,
      },
      {
        startAmount: '500',
        endAmount: '0.167',
        success: true,
        UserId: user.id,
        startWalletId: remoteUsdt.id,
        endWalletId: remoteBtc.id,
        startCoinId: usdt.id,
        endCoinId: btc.id,
      },
      {
        startAmount: '500',
        endAmount: '0.091',
        success: true,
        UserId: user.id,
        startWalletId: remoteUsdt.id,
        endWalletId: remoteBtc.id,
        startCoinId: usdt.id,
        endCoinId: btc.id,
      },
      {
        startAmount: '0.472',
        endAmount: '0.472',
        success: false,
        UserId: user.id,
        startWalletId: remoteBtc.id,
        endWalletId: localBtc.id,
        startCoinId: btc.id,
        endCoinId: btc.id,
      },
      {
        startAmount: '0.475',
        endAmount: '0.475',
        success: true,
        UserId: user.id,
        startWalletId: remoteBtc.id,
        endWalletId: localBtc.id,
        startCoinId: btc.id,
        endCoinId: btc.id,
      }
    ])
  },
  down: () => {
    return db.sequelize.drop();
  }
})