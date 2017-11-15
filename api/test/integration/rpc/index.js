// const { expect } = require('chai');
// const { describe, it } = require('mocha');

// const Client = require('bitcoin-core');

// //Should we even include the RPC client v1?
// describe('rpc client', () => {
//   it.skip('should be able to connect', done => {
//     const client = new Client({
//       port: 8032,
//       username: 'rpc',
//       password: 'pass'
//     })

//     client.getInfo().then(({
//       version
//     }) => {
//       expect(version).to.be.ok;
//       done();
//     })
//   });
// })