const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Option',
  description: 'An option key/value pair',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the user',
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the user',
    }
  }
})