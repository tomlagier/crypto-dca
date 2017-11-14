const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const fetch = require('node-fetch');
const runMigration = require('../../helpers/migration');
const { name } = require('../../helpers/sort');

describe('wallet query', () => {
  let migrate, db;
  before(async () => {
    db = require('../setup')();
    migrate = runMigration(db);
    await migrate.up();
  });

  it('should be able to query all wallets', async () => {
    const query = encodeURIComponent(`
      {
        wallets {
          name,
          address,
          local
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { wallets } } = await resp.json();
    expect(
      wallets.sort(name)
    ).to.deep.equal([
      {
        "name": "local BTC",
        "address": "abacadsf",
        "local": true
      },
      {
        "name": "remote BTC",
        "address": "asdfdcvzdsfasd",
        "local": false
      },
      {
        "name": "remote USDT",
        "address": "vczvsadf",
        "local": false
      }
    ])
  });

  it('should be able to look a wallet up by ID', async () => {
    const idQuery = encodeURIComponent(`
      {
        walletSearch(query:"local BTC") {
          id
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${idQuery}`)
    const { data: { walletSearch: [{id}] } } = await resp.json();

    const query = encodeURIComponent(`
      {
        wallet(id:"${id}") {
          name
        }
      }
    `);

    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {wallet}} = await resp2.json();
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