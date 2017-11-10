const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { Op: {iLike} } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const userType = require('./type');
const sort = require('../../helpers/sort');

module.exports = User => ({
  user: {
    type: userType,
    args: {
      id: {
        description: 'ID of user',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolver(User, {
      after: result => result.length ? result[0] : result
    })
  },
  users: {
    type: new GraphQLList(userType),
    resolve: resolver(User)
  },
  userSearch: {
    type: new GraphQLList(userType),
    args: {
      query: {
        description: 'Fuzzy-matched name of user',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(User, {
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
