const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const fetch = require('node-fetch');
const runFileMigration = require('../../../helpers/run-file-migration');

describe('wallet query', () => {
  let migrate, db;
  before(async () => {
    db = require('../setup')();
    migrate = runFileMigration('test-data.sql', db);
    await migrate.up();
  });

  it('should be able to query all wallets', async () => {
    const query = encodeURIComponent(`
      {
        wallets {
          id,
          name,
          address,
          local
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { wallets }} = await resp.json();
    expect(wallets).to.deep.equal([
      {
        "id": 1,
        "name": "local BTC",
        "address": "abacadsf",
        "local": true
      },
      {
        "id": 2,
        "name": "remote BTC",
        "address": "asdfdcvzdsfasd",
        "local": false
      },
      {
        "id": 3,
        "name": "remote USDT",
        "address": "vczvsadf",
        "local": false
      }
    ])
  });

  it('should be able to look a wallet up by ID', async () => {
    const query = encodeURIComponent(`
      {
        wallet(id:1) {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {wallet}} = await resp.json();
    expect(wallet).to.deep.equal({
      name: 'local BTC'
    })
  });

  it('should be able to search for a wallet by name', async () => {
    const query = encodeURIComponent(`
      {
        walletSearch(query:"BTC") {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {walletSearch}} = await resp.json();
    expect(walletSearch).to.deep.equal([
      {
        "name": "local BTC"
      },
      {
        "name": "remote BTC"
      }
    ])
  });

  after(async () => {
    await migrate.down();
  })
})