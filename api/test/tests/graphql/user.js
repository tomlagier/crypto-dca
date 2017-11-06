const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const fetch = require('node-fetch');
const runFileMigration = require('../../../helpers/run-file-migration');

describe('user query', () => {
  let migrate, db;
  before(async () => {
    db = require('../setup')();
    migrate = runFileMigration('test-data.sql', db);
    await migrate.up();
  });

  it('should be able to query all users', async () => {
    const query = encodeURIComponent(`
      {
        users {
          id,
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const result = await resp.json();
    expect(result.data.users.length).to.equal(2);
    expect(result.data.users[0]).to.deep.equal({
      id: 1,
      name: 'tomlagier'
    })
    expect(result.data.users[1]).to.deep.equal({
      id: 2,
      name: 'marylagier'
    })
  });

  it('should be able to look a user up by ID', async () => {
    const query = encodeURIComponent(`
      {
        user(id:1) {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const result = await resp.json();
    expect(result.data.user).to.deep.equal({
      name: 'tomlagier'
    })
  });

  it('should be able to search for a username', async () => {
    const query = encodeURIComponent(`
      {
        userSearch(query:"mary") {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const result = await resp.json();
    expect(result.data.userSearch).to.deep.equal([{
      name: 'marylagier'
    }])
  });

  it('should be able to look up wallets, coins, options, and transactions by user', async () => {
    const query = encodeURIComponent(`
      {
        user(id:1) {
          wallets {
            name
          }
          coins {
            name
          }
          options {
            name
          }
          transactions {
            success
          }
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {
      data: {
        user: {
          wallets,
          coins,
          options,
          transactions
        }
      }
    }= await resp.json();
    expect(wallets, 'Wallets').to.deep.equal([
      { name: 'local BTC' },
      { name: 'remote BTC' },
      { name: 'remote USDT' }
    ]);
    expect(coins, 'Coins, ').to.deep.equal([
      { name: 'BitCoin' },
      { name: 'Tether' }
    ]);
    expect(options, 'Options',).to.deep.equal([
      { name: 'invest_interval' },
      { name: 'auto_rebalance' }
    ]);
    expect(transactions, 'Transactions').to.deep.equal([
      { success: true },
      { success: true },
      { success: true },
      { success: false },
      { success: true }
    ])
  });

  after(async () => {
    await migrate.down();
  })
})