const { expect } = require('chai');
const { describe, it } = require('mocha');
const fetch = require('node-fetch');
const {name} = require('../../helpers/sort');

describe('coin query', () => {
  it('should be able to query all coins', async () => {
    const query = encodeURIComponent(`{
      coins {
        name
        code
        active
        localAmount
        localWallet {
          name
        }
        exchangeAmount
        exchangeWallet {
          name
        }
        purchaseAmount
        feeTolerance
        portfolioWeight
      }
    }`);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { coins }} = await resp.json();
    expect(
      coins.sort(name)
    ).to.deep.equal([
      {
        "name": "BitCoin",
        "code": "BTC",
        "active": true,
        "localAmount": "3.341",
        "localWallet": {
          "name": "local BTC"
        },
        "exchangeAmount": "0.023",
        "exchangeWallet": {
          "name": "remote BTC"
        },
        "purchaseAmount": "0.001",
        "feeTolerance": "0",
        "portfolioWeight": 50
      },
      {
        "name": "Tether",
        "code": "USDT",
        "active": true,
        "localAmount": "0",
        "localWallet": null,
        "exchangeAmount": "524",
        "exchangeWallet": {
          "name": "remote USDT"
        },
        "purchaseAmount": "0",
        "feeTolerance": "0",
        "portfolioWeight": 0
      }
    ])
  });

  it('should be able to look a coin up by ID', async () => {
    const idQuery = encodeURIComponent(`{
      coinSearch(query:"bit") {
        id
      }
    }`);
    const resp = await fetch(`http://localhost:8088/graphql?query=${idQuery}`)
      const {data: {coinSearch: [{id}]}} = await resp.json();

    const query = encodeURIComponent(`{
      coin(id:"${id}") {
        code
      }
    }`);

    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {coin}} = await resp2.json();
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
})