const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const GraphQLDate = require('graphql-date');

const { resolver } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
  name: 'Transaction',
  description: 'A transaction of cryptocurrency',
  fields: () => {
    const { Transaction } = require('../');
    const Wallet = require('../wallet/type');
    const Coin = require('../coin/type');
    return {
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
        description: 'Starting wallet',
        resolve: resolver(Transaction.StartWallet)
      },
      endWallet: {
        type: Wallet,
        description: 'Ending wallet',
        resolve: resolver(Transaction.EndWallet)
      },
      startCoin: {
        type: Coin,
        description: 'Starting coin',
        resolve: resolver(Transaction.StartCoin)
      },
      endCoin: {
        type: Coin,
        description: 'Ending coin',
        resolve: resolver(Transaction.EndCoin)
      },
      createdAt: {
        type: GraphQLDate,
        description: 'Transaction initiation time'
      },
      updatedAt: {
        type: GraphQLDate,
        description: 'Transaction resolution time'
      }
    }
  }
})