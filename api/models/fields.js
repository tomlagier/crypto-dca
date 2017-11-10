const db = require('./');

const fields = [
  'User',
  'Wallet',
  'Coin',
  'Transaction',
  'Option'
].reduce((all, model) => ({
  //Splat all queries and mutations on the top level
  ...require(`./${model}/queries`)(db[model]),
  // ...require(`./${model}/mutations`),
  ...all
}), {});

module.exports = () => fields;