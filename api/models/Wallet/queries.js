const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { Op: {iLike} } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const walletType = require('./type');
const sort = require('../../helpers/sort');

module.exports = Wallet => ({
  wallet: {
    type: new GraphQLList(walletType),
    args: {
      id: {
        description: 'ID of wallet',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolver(Wallet)
  },
  wallets: {
    type: new GraphQLList(walletType),
    resolve: resolver(Wallet)
  },
  walletSearch: {
    type: new GraphQLList(walletType),
    args: {
      query: {
        description: 'Fuzzy-matched name of wallet',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(Wallet, {
      before: (findOptions, args) => {
        findOptions.where = {
          name: { [iLike]: `%${args.query}%` },
        };
        findOptions.order = [['name', 'ASC']];
        return findOptions;
      },
      after: sort
    })
  }
})
