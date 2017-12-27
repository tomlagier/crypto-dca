const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');

// const { Op: {like} } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const transactionType = require('./type');
// const sort = require('../../helpers/sort');

module.exports = ({ Transaction }) => ({
  transaction: {
    type: transactionType,
    args: {
      id: {
        description: 'ID of transactions',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(Transaction, {
      after: result => (result.length ? result[0] : result)
    })
  },
  transactions: {
    type: new GraphQLList(transactionType),
    resolve: resolver(Transaction)
  }
  //TODO: this
  // transactionSearch: {
  //   type: new GraphQLList(Transaction),
  //   args: {
  //     query: {
  //       description: 'Fuzzy search on startCoin, endCoin, startWallet, endWallet',
  //       type: new GraphQLNonNull(GraphQLString)
  //     }
  //   },
  //   resolve: resolver(Transaction, {
  //     before: (findOptions, args) => {
  //       findOptions.where = {

  //         name: { [like]: `%${args.query}%` },
  //       };
  //       findOptions.order = [['name', 'ASC']];
  //       return findOptions;
  //     },
  //     after: sort
  //   })
  // }
});
