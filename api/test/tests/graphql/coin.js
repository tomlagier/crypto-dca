const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const fetch = require('node-fetch');
const runFileMigration = require('../../../helpers/run-file-migration');

describe('coin query', () => {
  let migrate, db;
  before(async () => {
    db = require('../setup')();
    migrate = runFileMigration('test-data.sql', db);
    await migrate.up();
  });

  it('should be able to query all coins', async () => {
    const query = encodeURIComponent(`{
      coins {
        id
        name
        code
        active
        localAmount
        localWallet {
          id
        }
        exchangeAmount
        exchangeWallet {
          id
        }
        purchaseAmount
        feeTolerance
        portfolioWeight
      }
    }`);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { coins }} = await resp.json();
    expect(coins).to.deep.equal([
      {
        "id": 1,
        "name": "BitCoin",
        "code": "BTC",
        "active": true,
        "localAmount": "3.341",
        "localWallet": {
          "id": 1
        },
        "exchangeAmount": "0.023",
        "exchangeWallet": {
          "id": 2
        },
        "purchaseAmount": "0.001",
        "feeTolerance": "0",
        "portfolioWeight": 50
      },
      {
        "id": 2,
        "name": "Tether",
        "code": "USDT",
        "active": true,
        "localAmount": "0",
        "localWallet": null,
        "exchangeAmount": "524",
        "exchangeWallet": {
          "id": 3
        },
        "purchaseAmount": "0",
        "feeTolerance": "0",
        "portfolioWeight": 0
      }
    ])
  });

  it('should be able to look a coin up by ID', async () => {
    const query = encodeURIComponent(`{
      coin(id:1) {
        code
      }
    }`);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {coin}} = await resp.json();
    expect(coin).to.deep.equal({
      "code": "BTC"
    })
  });

  it('should be able to search for a coin by name', async () => {
    const query = encodeURIComponent(`{
      coinSearch(query:"bit") {
        code
      }
    }`);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {coinSearch}} = await resp.json();
    expect(coinSearch).to.deep.equal([
      { "code": "BTC" }
    ])
  });

  it('should be able to search for a coin by code', async () => {
    const query = encodeURIComponent(`{
      coinSearch(query:"US") {
        code
      }
    }`);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {coinSearch}} = await resp.json();
    expect(coinSearch).to.deep.equal([
      { "code": "USDT" }
    ])
  });

  after(async () => {
    await migrate.down();
  })
})