const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { resolver } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => {
    const { User } = require('../');
    const Wallet = require('../wallet/type');
    const Coin = require('../coin/type');
    const Option = require('../option/type');
    const Transaction = require('../transaction/type');

    return {
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
        description: 'The users wallets',
        resolve: resolver(User.Wallets)
      },
      coins: {
        type: new GraphQLList(Coin),
        description: 'The users coins',
        resolve: resolver(User.Coins)
      },
      transactions: {
        type: new GraphQLList(Transaction),
        description: 'The users transactions',
        resolve: resolver(User.Transactions)
      },
      options: {
        type: new GraphQLList(Option),
        description: 'The users options',
        resolve: resolver(User.Options)
      }
    }
  }
})