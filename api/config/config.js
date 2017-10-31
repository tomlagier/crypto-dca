const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PROD_DB
} = process.env

module.exports = {
  development:{
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DEV_DB,
    host: "crypto-dca-db:5432",
    dialect: "postgres"
  },
  test: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_TEST_DB,
    host: "crypto-dca-db:5432",
    dialect: "postgres"
  },
  production: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_PROD_DB,
    host: "crypto-dca-db:5432",
    dialect: "postgres"
  }
}
