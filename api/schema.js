const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

const fields = require('./models/fields');

// const {
//   User,
//   Coin,
//   Wallet,
//   Option,
//   Transaction,
//   types: {
//     User: userType,
//     Coin: coinType,
//     Wallet: walletType,
//     Option: optionType,
//     Transaction: transactionType
//   }
// } = require('./models');


module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields
  })
});