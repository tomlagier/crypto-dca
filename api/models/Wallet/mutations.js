const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const walletType = require('./type');
const { resolver } = require('graphql-sequelize');

module.exports = Wallet => ({
  createWallet: {
    type: walletType,
    args: {
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
    },
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
  }
});
