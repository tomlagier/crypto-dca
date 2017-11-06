const { start } = require('./helpers/server');
const { up } = require('./helpers/db');

up();
start();