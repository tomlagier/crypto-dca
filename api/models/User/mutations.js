const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const userType = require('./type');
const { resolver } = require('graphql-sequelize');

module.exports = User => ({
  createUser: {
    type: userType,
    args: {
      name: {
        description: 'Unique username',
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        description: 'Unique username',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async function(...args){
      const [, {name, password}] = args
      console.log('here');
      await User.create({
        name,
        password
      })
      return resolver(User)(args);
    }
  }
});