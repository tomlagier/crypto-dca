const {
  GraphQLObjectType,
  GraphQLBoolean
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'DeleteSuccessful',
  fields: {
    success: {
      type: GraphQLBoolean,
      description: 'Whether delete was a success'
    }
  }
});
