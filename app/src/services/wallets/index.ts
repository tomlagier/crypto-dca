import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export interface Wallet {
  id: string;
  name: string;
  address: string;
  local: boolean;
}

export interface WalletsProps {
  data?: {
    loading?: boolean;
    wallets?: Wallet[];
  };
}

export const walletFields = `
  name
  address
  local
`;

// graphQL query and selector
const WALLETS = gql`
  query {
    wallets {
      ${walletFields}
    }
  }
`;

export const withWallets = graphql<Response, WalletsProps>(
  WALLETS,
  {
    props: ({
      data: { loading, wallets }
    }: WalletsProps) => ({
      loading,
      wallets
    })
  }
);
