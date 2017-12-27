const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLUnionType
} = require('graphql');

const coinType = require('./type');
const deleteType = require('../../helpers/types/delete');
const { resolver } = require('graphql-sequelize');

module.exports = ({ Coin, Wallet }) => ({
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
      },
      localWalletId: {
        description: 'ID of local wallet',
        type: GraphQLString
      },
      exchangeWalletId: {
        description: 'ID of exchange wallet',
        type: GraphQLString
      }
    },
    resolve: async function(
      root,
      { name, code, localWalletId, exchangeWalletId },
      context,
      info
    ) {
      const { user: { id } } = context;
      if (!id) return null;

      const [
        localWallet,
        exchangeWallet
      ] = await Promise.all([
        Wallet.findOne({
          where: {
            UserId: id,
            id: localWalletId
          }
        }),
        Wallet.findOne({
          where: {
            UserId: id,
            id: exchangeWalletId
          }
        })
      ]);

      const coin = await Coin.create({
        name,
        code,
        UserId: id,
        localWalletId: localWallet.id,
        exchangeWalletId: exchangeWallet.id
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
