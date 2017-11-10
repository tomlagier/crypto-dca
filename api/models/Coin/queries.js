const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { Op: {or, iLike} } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const coinType = require('./type');
const sort = require('../../helpers/sort');

module.exports = Coin => ({
  coin: {
    type: coinType,
    args: {
      id: {
        description: 'ID of coin',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(Coin, {
      after: result => result.length ? result[0] : result
    })
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
      before: (findOptions, { query }) => ({
        where: {
          [or]: [{
            name: { [iLike]: `%${query}%` }
          },
          {
            code: { [iLike]: `%${query}%` }
          }]
        },
        order: [['name', 'ASC']],
        ...findOptions
      }),
      after: sort
    })
  }
})
