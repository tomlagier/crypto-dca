const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

const fields = require('./models/fields');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields
  })
});