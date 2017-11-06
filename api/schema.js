const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

const createFields = require('./models/fields');

module.exports = db => new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: createFields(db)
  })
});