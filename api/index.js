const server = require('./helpers/server');
const { up } = require('./helpers/db');

up();
server.start();