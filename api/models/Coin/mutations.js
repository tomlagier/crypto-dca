const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLFloat
} = require('graphql');

const coinType = require('./type');
const deleteType = require('../../helpers/types/delete');
const { resolver } = require('graphql-sequelize');

const resolveWallets = async (
  Wallet,
  userId,
  {
    localWalletId,
    exchangeWalletId,
    newLocalWallet,
    newExchangeWallet
  }
) => {
  return await Promise.all([
    resolveWallet(
      Wallet,
      userId,
      localWalletId,
      newLocalWallet
    ),
    resolveWallet(
      Wallet,
      userId,
      exchangeWalletId,
      newExchangeWallet
    )
  ]);
};

const resolveWallet = async (
  Wallet,
  userId,
  id,
  newWallet
) => {
  let wallet;
  if (id && id !== 'new') {
    wallet = await resolveExistingWallet(
      Wallet,
      userId,
      id
    );
  } else if (newWallet) {
    wallet = await createNewWallet(
      Wallet,
      userId,
      newWallet
    );
  }

  return wallet;
};

const resolveExistingWallet = async (
  Wallet,
  userId,
  id
) => {
  return await Wallet.findOne({
    where: {
      UserId: userId,
      id
    }
  });
};

const createNewWallet = async (
  Wallet,
  userId,
  newWallet
) => {
  newWallet.UserId = userId;
  return await Wallet.create(newWallet);
};

const walletInputType = new GraphQLInputObjectType({
  name: 'WalletInputType',
  fields: {
    name: {
      description: 'Name of coin',
      type: new GraphQLNonNull(GraphQLString)
    },
    address: {
      description: 'Address of coin',
      type: new GraphQLNonNull(GraphQLString)
    },
    local: {
      description: 'Whether the coin is local or remote',
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  }
});

module.exports = ({ Coin, Wallet }) => ({
  upsertCoin: {
    type: coinType,
    args: {
      id: {
        description: 'ID of coin',
        type: GraphQLString
      },
      name: {
        description: 'Name of coin',
        type: GraphQLString
      },
      code: {
        description: 'Code of coin',
        type: GraphQLString
      },
      localWalletId: {
        description: 'ID of local wallet',
        type: GraphQLString
      },
      exchangeWalletId: {
        description: 'ID of exchange wallet',
        type: GraphQLString
      },
      newLocalWallet: {
        description: 'New local wallet',
        type: walletInputType
      },
      newExchangeWallet: {
        description: 'New exchange wallet',
        type: walletInputType
      },
      feeTolerance: {
        description:
          'Allowable fee amount before transfer locally',
        type: GraphQLString
      },
      active: {
        description:
          'Whether the coin is currently being purchased',
        type: GraphQLBoolean
      },
      portfolioWeight: {
        description:
          'Amount of new purchase to allocate to coin',
        type: GraphQLFloat
      },
      localAmount: {
        description: 'Amount of coin held locally',
        type: GraphQLString
      },
      exchangeAmount: {
        description: 'Amount of coin held on exchange',
        type: GraphQLString
      },
      purchaseAmount: {
        description:
          'Dollar amount saved towards next purchase',
        type: GraphQLString
      }
    },
    resolve: async function(root, args, context, info) {
      const { user: { id } } = context;
      if (!id) return null;

      const [
        localWallet,
        exchangeWallet
      ] = await resolveWallets(Wallet, id, args);

      const nextCoin = args;
      nextCoin.UserId = id;

      if (localWallet)
        nextCoin.localWallet = localWallet.id;
      if (exchangeWallet)
        nextCoin.exchangeWallet = exchangeWallet.id;

      const coin = nextCoin.id
        ? await Coin.update(nextCoin)
        : await Coin.create(nextCoin);

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
