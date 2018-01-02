import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { WALLETS, Wallet, walletFields } from '../wallets';
import { mutate } from '../../graphql';

export interface Coin {
  id: string;
  feeTolerance: string;
  name: string;
  code: string;
  active: boolean;
  portfolioWeight: number;
  localAmount: string;
  exchangeAmount: string;
  purchaseAmount: string;
  localWallet: Wallet;
  exchangeWallet: Wallet;
}

interface CoinsProps {
  data?: {
    loading?: boolean;
    coins?: Coin[];
  };
}

const coinFields = `
  id
  feeTolerance
  name
  code
  active
  portfolioWeight
  localAmount
  exchangeAmount
  purchaseAmount
  localWallet {
    ${walletFields}
  }
  exchangeWallet {
    ${walletFields}
  }
`;

// Create coin
const COINS = gql`
  query {
    coins {
      ${coinFields}
    }
  }
`;
export const withCoins = graphql<Response, CoinsProps>(
  COINS,
  {
    props: ({ data: { loading, coins } }: CoinsProps) => ({
      loading,
      coins
    })
  }
);

const CREATE_COIN = gql`
  mutation createCoin(
    $name: String!,
    $code: String!,
    $localWalletId: String,
    $exchangeWalletId: String
    $newLocalWallet: WalletInputType
    $newExchangeWallet: WalletInputType
  ) {
    createCoin(
      name: $name,
      code: $code,
      localWalletId: $localWalletId,
      exchangeWalletId: $exchangeWalletId
      newLocalWallet: $newLocalWallet
      newExchangeWallet: $newExchangeWallet
    ) {
      ${coinFields}
    }
  }
`;

type CreateCoinArgs = {
  localWallet?: string | Wallet;
  exchangeWallet?: string | Wallet;
  newLocalWallet?: Wallet;
  newExchangeWallet?: Wallet;
} & Coin;

interface CreateCoinResult {
  data?: {
    createCoin?: Coin;
  };
}

const resolveWalletsFromResponse = (
  args: CreateCoinArgs,
  existingCoin: Coin
) => ({
  localWallet:
    args.localWallet === existingCoin.localWallet.id
      ? existingCoin.localWallet
      : args.localWallet,
  exchangeWallet:
    args.exchangeWallet === existingCoin.exchangeWallet.id
      ? existingCoin.exchangeWallet
      : args.exchangeWallet
});

const getWalletsFromArgs = ({
  localWallet,
  exchangeWallet,
  newLocalWallet,
  newExchangeWallet
}: CreateCoinArgs) => ({
  localWalletId:
    localWallet !== 'new' ? localWallet : undefined,
  exchangeWalletId:
    exchangeWallet !== 'new' ? exchangeWallet : undefined,
  newLocalWallet: newLocalWallet
    ? Object.assign({}, newLocalWallet, {
        local: true
      })
    : undefined,
  newExchangeWallet: newExchangeWallet
    ? Object.assign({}, newExchangeWallet, {
        local: false
      })
    : undefined
});

const addNewCoin = (proxy: any, coin: Coin) => {
  const coinsQuery = proxy.readQuery({
    query: COINS
  }) as { coins: Coin[] };

  coinsQuery.coins.push(coin);
  proxy.writeQuery({ query: COINS, data: coinsQuery });
};

const addNewWallets = (
  proxy: any,
  coin: Coin,
  args: CreateCoinArgs
) => {
  const walletsQuery = proxy.readQuery({
    query: WALLETS
  }) as { wallets: Wallet[] };

  args.newLocalWallet &&
    walletsQuery.wallets.push(coin.localWallet);
  args.newExchangeWallet &&
    walletsQuery.wallets.push(coin.exchangeWallet);

  proxy.writeQuery({
    query: WALLETS,
    data: walletsQuery
  });
};

export const createCoin = (args: CreateCoinArgs) =>
  mutate({
    mutation: CREATE_COIN,
    variables: Object.assign(
      {},
      args,
      getWalletsFromArgs(args)
    ),
    update: (
      proxy,
      { data: { createCoin: coin } }: CreateCoinResult
    ) => {
      addNewCoin(proxy, coin);
      addNewWallets(proxy, coin, args);
    }
  });

// Update coin
const UPDATE_COIN = gql`
  mutation updateCoin(
    $id: String
    $name: String,
    $code: String
  ) {
    updateCoin(
      id: $id
      name: $name,
      code: $code
    ) {
      ${coinFields}
    }
  }
`;

const updateExistingCoin = (
  proxy: any,
  args: CreateCoinArgs
) => {
  const coinsQuery = proxy.readQuery({
    query: COINS
  }) as { coins: Coin[] };

  const existingCoin = coinsQuery.coins.find(
    searchCoin => searchCoin.id === args.id
  );

  const idx = coinsQuery.coins.indexOf(existingCoin);
  coinsQuery.coins[idx] = Object.assign(
    {},
    existingCoin,
    args,
    resolveWalletsFromResponse(args, existingCoin)
  );
};

export const updateCoin = (args: CreateCoinArgs) =>
  mutate({
    mutation: UPDATE_COIN,
    variables: Object.assign(
      {},
      args,
      getWalletsFromArgs(args)
    ),
    update: (
      proxy,
      { data: { createCoin: coin } }: CreateCoinResult
    ) => {
      updateExistingCoin(proxy, args);
      // addNewWallets(proxy, coin, args);
    }
  });

// Delete coin
const DELETE_COIN = gql`
  mutation deleteCoin($id: String!) {
    deleteCoin(id: $id) {
      success
    }
  }
`;

interface DeleteCoinArgs {
  id: string;
}

interface SuccessResponse {
  success: boolean;
}

interface DeleteResponse {
  data?: SuccessResponse;
}

export const deleteCoin = ({ id }: DeleteCoinArgs) =>
  mutate({
    mutation: DELETE_COIN,
    variables: { id },
    update: (
      proxy,
      { data: { success } }: DeleteResponse
    ) => {
      const coinsQuery = proxy.readQuery({
        query: COINS
      }) as { coins: Coin[] };
      const nextCoins = coinsQuery.coins.filter(
        coin => coin.id !== id
      );
      proxy.writeQuery({
        query: COINS,
        data: { coins: nextCoins }
      });
    }
  });
