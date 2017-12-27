const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { Op: { or, iLike } } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const optionType = require('./type');
const sort = require('../../helpers/sort');

module.exports = ({ Option }) => ({
  option: {
    type: optionType,
    args: {
      id: {
        description: 'ID of option',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(Option, {
      after: result => (result.length ? result[0] : result)
    })
  },
  options: {
    type: new GraphQLList(optionType),
    resolve: resolver(Option)
  },
  optionSearch: {
    type: new GraphQLList(optionType),
    args: {
      query: {
        description:
          'Fuzzy-matched name of option key or value',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(Option, {
      before: (findOptions, { query }) => ({
        where: {
          [or]: [
            {
              name: { [iLike]: `%${query}%` }
            },
            {
              value: { [iLike]: `%${query}%` }
            }
          ]
        },
        order: [['name', 'ASC']]
      }),
      after: sort
    })
  }
});
