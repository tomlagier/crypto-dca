import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Wallet } from '../wallets';

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
`;

const walletFields = `
  localWallet {
    name
    address
    local
  }
  exchangeWallet {
    name
    address
    local
  }
`;

// graphQL query and selector
const COINS = gql`
  query {
    coins {
      ${coinFields}
      ${walletFields}
    }
  }
`;
export const withCoins = graphql<Response, CoinsProps>(COINS, {
  props: ({ data: { loading, coins } }: CoinsProps) => ({ loading, coins })
});

const CREATE_COIN = gql`
  mutation createCoin($name: String!, $code: String!) {
    createCoin(name: $name, code: $code) {
      ${coinFields}
      ${walletFields}
    }
  }
`;

interface CreateCoinArgs {
  name: string;
  code: string;
}

interface CreateCoinResult {
  data?: {
    createCoin?: Coin;
  };
}

export const createCoin = graphql<Response, Coin>(CREATE_COIN, {
  props: ({ mutate }) => ({
    createCoin: ({ name, code }: CreateCoinArgs) =>
      mutate({
        variables: { name, code },
        update: (proxy, { data: { createCoin: coin } }: CreateCoinResult) => {
          const coinsQuery = proxy.readQuery({
            query: COINS
          }) as { coins: Coin[] };
          coinsQuery.coins.push(coin);
          proxy.writeQuery({ query: COINS, data: coinsQuery });
        }
      })
  })
});

const DELETE_COIN = gql`
  mutation deleteCoin($id: String!) {
    deleteCoin(id: $id) {
      success
    }
  }
`;

interface SuccessResponse {
  success: boolean;
}

interface DeleteResponse {
  data?: SuccessResponse;
}

export const deleteCoin = graphql<Response, SuccessResponse>(DELETE_COIN, {
  props: ({ mutate }) => ({
    deleteCoin: ({ id }: { id: string }) =>
      mutate({
        variables: { id },
        update: (proxy, { data: { success } }: DeleteResponse) => {
          const coinsQuery = proxy.readQuery({
            query: COINS
          }) as { coins: Coin[] };
          const nextCoins = coinsQuery.coins.filter(coin => coin.id !== id);
          proxy.writeQuery({ query: COINS, data: { coins: nextCoins } });
        }
      })
  })
});
