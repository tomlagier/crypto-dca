const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Option',
  description: 'An option key/value pair',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the option',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the option',
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the option',
    }
  }
})