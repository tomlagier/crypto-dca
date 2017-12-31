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

// graphQL query and selector
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

// Unclear why localWallet and exchangeWallet need to be marked
// required to be sent
const CREATE_COIN = gql`
  mutation upsertCoin(
    $name: String!,
    $code: String!,
    $localWalletId: String,
    $exchangeWalletId: String
    $newLocalWallet: WalletInputType
    $newExchangeWallet: WalletInputType
  ) {
    upsertCoin(
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

interface upsertCoinArgs {
  name: string;
  code: string;
  localWallet: string;
  exchangeWallet: string;
  newLocalWallet: Wallet;
  newExchangeWallet: Wallet;
}

interface upsertCoinResult {
  data?: {
    upsertCoin?: Coin;
  };
}

export const upsertCoin = ({
  name,
  code,
  localWallet,
  exchangeWallet,
  newLocalWallet,
  newExchangeWallet
}: upsertCoinArgs) => {
  return mutate({
    mutation: CREATE_COIN,
    variables: {
      name,
      code,
      localWalletId:
        localWallet !== 'new' ? localWallet : undefined,
      exchangeWalletId:
        exchangeWallet !== 'new'
          ? exchangeWallet
          : undefined,
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
    },
    update: (
      proxy,
      { data: { upsertCoin: coin } }: upsertCoinResult
    ) => {
      const coinsQuery = proxy.readQuery({
        query: COINS
      }) as { coins: Coin[] };
      coinsQuery.coins.push(coin);
      proxy.writeQuery({ query: COINS, data: coinsQuery });

      const walletsQuery = proxy.readQuery({
        query: WALLETS
      }) as { wallets: Wallet[] };

      newLocalWallet &&
        walletsQuery.wallets.push(coin.localWallet);
      newExchangeWallet &&
        walletsQuery.wallets.push(coin.exchangeWallet);

      proxy.writeQuery({
        query: WALLETS,
        data: walletsQuery
      });
    }
  });
};

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
