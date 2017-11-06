const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const fetch = require('node-fetch');
const { start, stop } = require('../../helpers/server');

describe('user model', () => {
  before(async () => {
    await start();
  });

  it('should be able to query the user', async () => {
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

  it('should be able to look up wallets by user', async () => {
    const query = encodeURIComponent(`
      {
        user(id:1) {
          wallets {
            name
          }
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const result = await resp.json();
    console.log(result);
    expect(result.data.user.wallets).to.deep.equal([
      { name: 'local btc' },
      { name: 'remote btc' },
      { name: 'remote usdt' }
    ]);
  });

  after(async () => {
    await stop();
  })
})