import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { mutate } from '../../graphql';

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

interface CreateWalletArgs {
  name: string;
  address: string;
  local: boolean;
  // localWalletId
  // remoteWalletId
}

interface CreateWalletResult {
  data?: {
    createWallet?: Wallet;
  };
}

const CREATE_WALLET = gql`
  mutation createWallet($name: String!, $address: String!, $local: Boolean!) {
    createWallet(name: $name, address: $address, local: $local) {
      ${walletFields}
    }
  }
`;

export const createWallet = ({
  name,
  address,
  local
}: CreateWalletArgs) =>
  mutate({
    mutation: CREATE_WALLET,
    variables: { name, address, local },
    update: (
      proxy,
      { data: { createWallet: wallet } }: CreateWalletResult
    ) => {
      const walletsQuery = proxy.readQuery({
        query: WALLETS
      }) as { wallets: Wallet[] };
      walletsQuery.wallets.push(wallet);
      proxy.writeQuery({
        query: WALLETS,
        data: walletsQuery
      });
    }
  });
