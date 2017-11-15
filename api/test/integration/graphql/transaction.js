const { expect } = require('chai');
const { describe, it } = require('mocha');
const fetch = require('node-fetch');
const { key } = require('../../helpers/sort');

describe('transaction query', () => {
  it('should be able to query all transactions', async () => {
    const query = encodeURIComponent(`
      {
        transactions {
          startAmount
          endAmount
          startCoin {
            name
          }
          startAmount
          startWallet {
            name
          }
          endCoin {
            name
          }
          endAmount
          endWallet {
            name
          }
          success
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { transactions } } = await resp.json();

    expect(
      transactions
      .sort(key('endAmount'))
    ).to.deep.equal([ { startAmount: '0.475',
    endAmount: '0.475',
    startCoin: { name: 'BitCoin' },
    startWallet: { name: 'remote BTC' },
    endCoin: { name: 'BitCoin' },
    endWallet: { name: 'local BTC' },
    success: true },
  { startAmount: '0.472',
    endAmount: '0.472',
    startCoin: { name: 'BitCoin' },
    startWallet: { name: 'remote BTC' },
    endCoin: { name: 'BitCoin' },
    endWallet: { name: 'local BTC' },
    success: false },
  { startAmount: '500',
    endAmount: '0.167',
    startCoin: { name: 'Tether' },
    startWallet: { name: 'remote USDT' },
    endCoin: { name: 'BitCoin' },
    endWallet: { name: 'remote BTC' },
    success: true },
  { startAmount: '500',
    endAmount: '0.153',
    startCoin: { name: 'Tether' },
    startWallet: { name: 'remote USDT' },
    endCoin: { name: 'BitCoin' },
    endWallet: { name: 'remote BTC' },
    success: true },
  { startAmount: '500',
    endAmount: '0.091',
    startCoin: { name: 'Tether' },
    startWallet: { name: 'remote USDT' },
    endCoin: { name: 'BitCoin' },
    endWallet: { name: 'remote BTC' },
    success: true } ])
  });

  it('should be able to look a transaction up by ID', async () => {
    const idQuery = encodeURIComponent(`
      {
        transactions {
          id,
          endAmount
        }
      }
    `)

    const resp = await fetch(`http://localhost:8088/graphql?query=${idQuery}`)
    const { data: { transactions } } = await
    resp.json();

    const [{ id }] = transactions.sort(key('endAmount'))

    const query = encodeURIComponent(`
      {
        transaction(id:"${id}") {
          startAmount
          endAmount
        }
      }
    `);
    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { transaction } } = await resp2.json();
    expect(transaction).to.deep.equal({
      "startAmount": "0.475",
      "endAmount": "0.475"
    })
  });

  it('should be able to look up the start and end coin and wallets', async () => {
    const idQuery = encodeURIComponent(`
      {
        transactions {
          id,
          endAmount
        }
      }
    `)

    const resp = await fetch(`http://localhost:8088/graphql?query=${idQuery}`)
    const { data: { transactions } } = await
    resp.json();

    const [{ id }] = transactions.sort(key('endAmount'))

    const query = encodeURIComponent(`{
      transaction(id:"${id}") {
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
    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {transaction}} = await resp2.json();
    expect(transaction).to.deep.equal({
      "startWallet": {
        "name": "remote BTC"
      },
      "endWallet": {
        "name": "local BTC"
      },
      "startCoin": {
        "code": "BTC"
      },
      "endCoin": {
        "code": "BTC"
      }
    })
  });
})