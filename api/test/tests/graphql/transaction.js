const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const fetch = require('node-fetch');
const runFileMigration = require('../../../helpers/run-file-migration');

describe('transaction query', () => {
  let migrate, db;
  before(async () => {
    db = require('../setup')();
    migrate = runFileMigration('test-data.sql', db);
    await migrate.up();
  });

  it('should be able to query all transactions', async () => {
    const query = encodeURIComponent(`
      {
        transactions {
          id
          startCoin {
            id
          }
          startAmount
          startWallet {
            id
          }
          endCoin {
            id
          }
          endAmount
          endWallet {
            id
          }
          success,
          createdAt,
          updatedAt
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { transactions }} = await resp.json();
    expect(transactions).to.deep.equal([
      {
        "id": "1",
        "startCoin": {
          "id": "2"
        },
        "startAmount": "500",
        "startWallet": {
          "id": "3"
        },
        "endCoin": {
          "id": "1"
        },
        "endAmount": "0.153",
        "endWallet": {
          "id": "2"
        },
        "success": true,
        "createdAt": "2017-11-04T01:31:30.706Z",
        "updatedAt": "2017-11-04T01:31:30.706Z"
      },
      {
        "id": "2",
        "startCoin": {
          "id": "2"
        },
        "startAmount": "500",
        "startWallet": {
          "id": "3"
        },
        "endCoin": {
          "id": "1"
        },
        "endAmount": "0.167",
        "endWallet": {
          "id": "2"
        },
        "success": true,
        "createdAt": "2017-11-04T01:31:30.706Z",
        "updatedAt": "2017-11-04T01:31:30.706Z"
      },
      {
        "id": "3",
        "startCoin": {
          "id": "2"
        },
        "startAmount": "500",
        "startWallet": {
          "id": "3"
        },
        "endCoin": {
          "id": "1"
        },
        "endAmount": "0.091",
        "endWallet": {
          "id": "2"
        },
        "success": true,
        "createdAt": "2017-11-04T01:31:30.706Z",
        "updatedAt": "2017-11-04T01:31:30.706Z"
      },
      {
        "id": "4",
        "startCoin": {
          "id": "2"
        },
        "startAmount": ".472",
        "startWallet": {
          "id": "2"
        },
        "endCoin": {
          "id": "2"
        },
        "endAmount": "0.091",
        "endWallet": {
          "id": "1"
        },
        "success": false,
        "createdAt": "2017-11-04T01:31:30.706Z",
        "updatedAt": "2017-11-04T01:31:30.706Z"
      },
      {
        "id": "5",
        "startCoin": {
          "id": "2"
        },
        "startAmount": ".472",
        "startWallet": {
          "id": "2"
        },
        "endCoin": {
          "id": "2"
        },
        "endAmount": "0.091",
        "endWallet": {
          "id": "1"
        },
        "success": true,
        "createdAt": "2017-11-04T01:31:30.706Z",
        "updatedAt": "2017-11-04T01:31:30.706Z"
      }
    ])
  });

  it('should be able to look a transaction up by ID', async () => {
    const query = encodeURIComponent(`
      {
        transaction(id:"1") {
          startAmount
          endAmount
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {transaction}} = await resp.json();
    expect(transaction).to.deep.equal({
      "startAmount": "500",
      "endAmount": "0.153"
    })
  });

  it('should be able to look up the start and end coin and wallets', async () => {
    const query = encodeURIComponent(`{
      transaction(id:"1") {
        startWallet{
          name
        }
        endWallet{
          name
        }
        startCoin{
          code
        }
        endCoin{
          code
        }
      }
    }`);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {transaction}} = await resp.json();
    expect(transaction).to.deep.equal({
      "startWallet": {
        "name": "remote USDT"
      },
      "endWallet": {
        "name": "remote BTC"
      },
      "startCoin": {
        "code": "USDT"
      },
      "endCoin": {
        "code": "BTC"
      }
    })
  });

  after(async () => {
    await migrate.down();
  })
})