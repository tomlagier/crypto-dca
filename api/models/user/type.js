const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const Wallet = require('../wallet/type');
const Coin = require('../coin/type');
const Option = require('../coin/type');
const Transaction = require('../coin/type');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the user',
    },
    wallets: {
      type: new GraphQLList(Wallet),
      description: 'The users wallets'
    },
    coins: {
      type: new GraphQLList(Coin),
      description: 'The users coins'
    },
    transactions: {
      type: new GraphQLList(Transaction),
      description: 'The users transactions'
    },
    options: {
      type: new GraphQLList(Option),
      description: 'The users options'
    }
  }
})