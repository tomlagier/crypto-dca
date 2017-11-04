const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { Op: {or, iLike} } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const { Coin } = require('../');
const coinType = require('./type');
const sort = require('../../helpers/sort');

module.exports = {
  coin: {
    type: coinType,
    args: {
      id: {
        description: 'ID of user',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolver(Coin)
  },
  coins: {
    type: new GraphQLList(coinType),
    resolve: resolver(Coin)
  },
  coinSearch: {
    type: new GraphQLList(coinType),
    args: {
      query: {
        description: 'Fuzzy-matched name or key of coin',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(Coin, {
      before: (findOptions, { query }) => {
        findOptions.where = {
          [or]: [{
            name: { [iLike]: `%${query}%` }
          },
          {
            code: { [iLike]: `%${query}%` }
          }
          ]
        };
        findOptions.order = [['name', 'ASC']];
        return findOptions;
      },
      after: sort
    })
  }
}
