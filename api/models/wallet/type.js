const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList
} = require('graphql');

const Transaction = require('../transaction/type');

module.exports = new GraphQLObjectType({
  name: 'Wallet',
  description: 'A wallet address',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the wallet',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the wallet',
    },
    address: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The address of the wallet',
    },
    local: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether the wallet is local or on an exchange'
    },
    transactions: {
      type: new GraphQLList(Transaction),
      description: 'Transactions associated with this wallet'
    }
  }
})