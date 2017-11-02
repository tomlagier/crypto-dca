const { expect } = require('chai');
const { describe, it } = require('mocha');


const Client = require('bitcoin-core');


describe('rpc client', () => {
  it('should be able to connect', done => {
    const client = new Client({
      port: 8032,
      username: 'rpc',
      password: 'pass'
    })

    client.getInfo().then(({
      version
    }) => {
      expect(version).to.be.ok;
      done();
    })
  });
})