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

// graphQL query and selector
const COINS = gql`query{
  coins {
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
      name
      address
      local
    }
    exchangeWallet {
      name
      address
      local
    }
  }
}`;
export const withCoins = graphql<Response, CoinsProps>(COINS, {
  props: ({
    data: {
      loading, coins
    }
  }: CoinsProps) => ({ loading, coins})
});