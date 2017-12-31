const logger = require('../helpers/logger');

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PROD_DB
} = process.env;

const logging = message => logger.verbose(message);

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DEV_DB,
    host: 'db',
    dialect: 'postgres',
    logging
  },
  test: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_TEST_DB,
    host: 'db',
    dialect: 'postgres',
    logging
  },
  production: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_PROD_DB,
    host: 'db',
    dialect: 'postgres',
    logging
  }
};
