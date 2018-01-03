const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const walletType = require('./type');
const deleteType = require('../../helpers/types/delete');
const { resolver } = require('graphql-sequelize');

const createWalletArgs = {
  name: {
    description: 'Name of wallet',
    type: new GraphQLNonNull(GraphQLString)
  },
  address: {
    description: 'Address of wallet',
    type: new GraphQLNonNull(GraphQLString)
  },
  local: {
    description:
      'Whether the wallet is local or on an exchange',
    type: new GraphQLNonNull(GraphQLBoolean)
  }
};

module.exports = ({ Wallet }) => ({
  createWallet: {
    type: walletType,
    args: createWalletArgs,
    resolve: async function(
      root,
      { name, address, local },
      context,
      info
    ) {
      const { user: { id } } = context;
      if (!id) return null;

      const wallet = await Wallet.create({
        name,
        address,
        local,
        UserId: id
      });
      return await resolver(Wallet)(
        root,
        {
          id: wallet.id
        },
        context,
        info
      );
    }
  },
  updateWallet: {
    type: walletType,
    args: {
      id: {
        description: 'ID of wallet',
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        description: 'Name of wallet',
        type: GraphQLString
      },
      address: {
        description: 'Address of wallet',
        type: GraphQLString
      },
      local: {
        description:
          'Whether the wallet is local or on an exchange',
        type: GraphQLBoolean
      }
    },
    resolve: async function(root, args, context, info) {
      const { user: { id } } = context;
      if (!id) return null;

      await Wallet.update(args, {
        where: { id: args.id }
      });
      return await resolver(Wallet)(
        root,
        {
          id: args.id
        },
        context,
        info
      );
    }
  },
  deleteWallet: {
    type: deleteType,
    args: {
      id: {
        description: 'ID of wallet',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async function(root, { id }, context) {
      const { user: { id: userId } } = context;
      if (!id || !userId) return null;

      const wallet = await Wallet.findOne({
        where: {
          id,
          UserId: userId
        }
      });

      if (!wallet)
        return {
          success: false
        };

      await wallet.set('isDeleted', true).save();
      return { success: true };
    }
  }
});
