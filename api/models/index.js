const buildDb = require('../helpers/build-db');
const decorateDb = require('../helpers/decorate-db');

module.exports = decorateDb(buildDb());