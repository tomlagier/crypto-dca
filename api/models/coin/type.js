const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');

const { resolver } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
  name: 'Coin',
  description: 'A cryptocurrency to be traded',
  fields: () => {
    const { Coin } = require('../');
    const Wallet = require('../wallet/type');
    const Transaction = require('../transaction/type');
    return {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The id of the coin',
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user-friendly name of the screen'
      },
      code: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The exchange code of the coin'
      },
      active: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: 'Whether trading is enabled or not'
      },
      portfolioWeight: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The weight of the coin in the user\'s portfolio'
      },
      localAmount: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Amount of coin held in local wallet'
      },
      exchangeAmount: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Amount of coin held in exchange wallet'
      },
      purchaseAmount: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Amount of coin waiting to be bought on exchange'
      },
      localWallet: {
        type: Wallet,
        description: 'Local wallet associated with coin',
        resolve: resolver(Coin.LocalWallet)
      },
      exchangeWallet: {
        type: Wallet,
        description: 'Wallet on exchange associated with coin',
        resolve: resolver(Coin.ExchangeWallet)
      },
      feeTolerance: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Maximum percentage of a transaction allowed to be lost in fees'
      },
      // transactions: {
      //   type: new GraphQLList(Transaction),
      //   description: 'Transactions associated with this coin'
      // }
    }
  }
})