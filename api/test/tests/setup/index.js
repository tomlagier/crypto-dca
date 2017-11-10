const { it } = require('chai');
const { before, after } = require('mocha');
const { up } = require('../../../helpers/db');
const { start, stop } = require('../../../helpers/server');

let db;
before(async () => {
  db = up();
  await start({ db });
})

after(async () => {
  await stop();
});

module.exports = () => db;