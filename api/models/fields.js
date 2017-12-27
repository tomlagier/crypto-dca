const db = require('./');

module.exports = [
  'User',
  'Wallet',
  'Coin',
  'Transaction',
  'Option'
].reduce(
  ({ queries, mutations }, model) => ({
    //Splat all queries and mutations on the top level
    queries: {
      ...require(`./${model}/queries`)(db),
      ...queries
    },
    mutations: {
      ...require(`./${model}/mutations`)(db),
      ...mutations
    }
  }),
  { queries: {}, mutations: {} }
);
