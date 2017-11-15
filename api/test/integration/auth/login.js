const { expect } = require('chai');
const { describe, it } = require('mocha');
const fetch = require('node-fetch');

const user = 'tomlagier';
const password = 'test-password';

describe('user creation', () => {

  it('can log a user in', async () => {
    var data = `username=${user}&password=${password}`
    const settings = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: data
    }

    const resp = await fetch('http://localhost:8088/login', settings)
    expect(resp.ok).to.be.ok;
    const cookie = resp.headers.get('set-cookie');
    expect(cookie.split('=')[0]).to.equal('connect.sid');
    const id = await resp.text();
    expect(id.split('').length).to.be.greaterThan(32);

    const query = encodeURIComponent(`
      {
        currentUser {
          name
        }
      }
    `);

    const settings2 = {
      credentials: 'include',
      headers: {'Cookie': cookie}
    }
    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`, settings2);
    const { data: { currentUser: { name } } } = await resp2.json();

    expect(name).to.equal('tomlagier');

  });

  it('rejects an invalid password', async () => {
    var data = `username=${user}&password=badpassword`
    const settings = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: data
    }

    const resp = await fetch('http://localhost:8088/login', settings)
    expect(resp.ok).not.to.be.ok;
    expect(resp.status).to.equal(401);
    expect(resp.headers.get('set-cookie')).not.to.be.ok;
  })

  it('rejects an invalid username', async () => {
    var data = `username=baduser&password=badpassword`
    const settings = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: data
    }

    const resp = await fetch('http://localhost:8088/login', settings)
    expect(resp.ok).not.to.be.ok;
    expect(resp.status).to.equal(401);
    expect(resp.headers.get('set-cookie')).not.to.be.ok;
  })

  it('can log a user out', async () => {
    var data = `username=${user}&password=${password}`
    const settings = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: data
    }

    const resp = await fetch('http://localhost:8088/login', settings)
    expect(resp.ok).to.be.ok;

    const resp2 = await fetch('http://localhost:8088/logout', {method: 'POST'})
    expect(resp2.ok).to.be.ok;
    const cookie = resp2.headers.get('set-cookie');
    expect(cookie).not.to.be.ok;


    const query = encodeURIComponent(`
      {
        currentUser {
          name
        }
      }
    `);

    const settings2 = {
      credentials: 'include',
      headers: {'Cookie': cookie}
    }
    const resp3 = await fetch(`http://localhost:8088/graphql?query=${query}`, settings2);
    const { data: { currentUser } } = await resp3.json();
    expect(currentUser).to.be.null;
  })
});