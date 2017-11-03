const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const Wallet = require('../wallet/type');
const Coin = require('../coin/type');

module.exports = new GraphQLObjectType({
  name: 'Transaction',
  description: 'A transaction of cryptocurrency',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user',
    },
    startAmount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The amount of startCoin spent'
    },
    endAmount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The amount of endCoin received'
    },
    success: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether the transaction was a success'
    },
    startWallet: {
      type: Wallet,
      description: 'Starting wallet'
    },
    endWallet: {
      type: Wallet,
      description: 'Ending wallet'
    },
    startCoin: {
      type: Coin,
      description: 'Starting coin'
    },
    endCoin: {
      type: Coin,
      description: 'Ending coin'
    }
  }
})