const { expect } = require('chai');
const { describe, it } = require('mocha');
const fetch = require('node-fetch');
const {name} = require('../../helpers/sort');

describe('user query', () => {
  it('should be able to query all users', async () => {
    const query = encodeURIComponent(`
      {
        users {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { users } } = await resp.json();
    expect(
      users.sort(name)
    ).to.deep.equal([
      {
        name: 'marylagier'
      },
      {
        name: 'tomlagier'
      }
    ]);
  });

  it('should be able to look a user up by ID', async () => {
    const idQuery = encodeURIComponent(`
      {
        userSearch(query:"mary") {
          id
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${idQuery}`)

    const {data: {userSearch: [{id}]}} = await resp.json();

    const query = encodeURIComponent(`
      {
        user(id:"${id}") {
          name
        }
      }
    `);
    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const result = await resp2.json();
    expect(result.data.user).to.deep.equal({
      name: 'marylagier'
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
    const idQuery = encodeURIComponent(`
      {
        userSearch(query:"tom") {
          id
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${idQuery}`)
    const {data: {userSearch: [{id}]}} = await resp.json();

    const query = encodeURIComponent(`
      {
        user(id:"${id}") {
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
    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {
      data: {
        user: {
          wallets,
          coins,
          options,
          transactions
        }
      }
    }= await resp2.json();
    expect(wallets.sort(name), 'Wallets').to.deep.equal([
      { name: 'local BTC' },
      { name: 'remote BTC' },
      { name: 'remote USDT' }
    ]);
    expect(coins.sort(name), 'Coins, ').to.deep.equal([
      { name: 'BitCoin' },
      { name: 'Tether' }
    ]);
    expect(options.sort(name), 'Options').to.deep.equal([
      { name: 'auto_rebalance' },
      { name: 'invest_interval' }
    ]);
    expect(transactions.length, 'Transactions').to.equal(5);
  });

  it('can create a user', async () => {
    const data = JSON.stringify({
      query: `mutation {
        createUser(
          name: "Test"
          password: "Tester"
        ) { name }
      }`
    })

    var settings = {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache"
      },
      "body": data
    }

    const resp = await fetch('http://localhost:8088/graphql', settings)
    const { data: { createUser: { name } } } = await resp.json();
    expect(name).to.equal('Test');
  });

  it('won\'t allow an existing username', async () => {
    const data = JSON.stringify({
      query: `mutation {
        createUser(
          name: "Test"
          password: "Tester"
        ) { name }
      }`
    })

    var settings = {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache"
      },
      "body": data
    }

    const resp = await fetch('http://localhost:8088/graphql', settings)
    expect(resp.ok).to.be.ok;

    const resp2 = await fetch('http://localhost:8088/graphql', settings)
    expect(resp2.ok).to.be.ok;
    const { errors: [{ message }] } = await resp2.json();
    expect(message).to.equal('Validation error');
  });
})