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
    type: walletType,
    args: {
      id: {
        description: 'ID of wallet',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolver(Wallet, {
      after: result => result.length ? result[0] : result
    })
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
      dataLoader: false,
      before: (findOptions, args) => ({
        where: {
          name: { [iLike]: `%${args.query}%` },
        },
        order: [['name', 'ASC']],
        ...findOptions
      }),
      after: sort
    })
  }
})
