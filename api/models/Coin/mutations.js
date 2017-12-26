const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const coinType = require('./type');
const deleteType = require('../../helpers/types/delete');
const { resolver } = require('graphql-sequelize');

module.exports = Coin => ({
  createCoin: {
    type: coinType,
    args: {
      name: {
        description: 'Name of coin',
        type: new GraphQLNonNull(GraphQLString)
      },
      code: {
        description: 'Code of coin',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async function(
      root,
      { name, code },
      context,
      info
    ) {
      const { user: { id } } = context;
      if (!id) return null;

      const coin = await Coin.create({
        name,
        code,
        UserId: id
      });
      return await resolver(Coin)(
        root,
        {
          id: coin.id
        },
        context,
        info
      );
    }
  },
  deleteCoin: {
    type: deleteType,
    args: {
      id: {
        description: 'ID of coin',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async function(root, { id }, context) {
      const { user: { id: userId } } = context;
      if (!id || !userId) return null;

      const coin = await Coin.findOne({
        where: {
          id,
          UserId: userId
        }
      });

      if (!coin)
        return {
          success: false
        };

      await coin.set('isDeleted', true).save();
      return { success: true };
    }
  }
});
