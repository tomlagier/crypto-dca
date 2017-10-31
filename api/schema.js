const {
  buildSchema,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} = require('graphql');
const { resolver } = require('graphql-sequelize')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        description: 'Maybe this will return world',
        resolve: () => 'World'
      }
    }
  })
});