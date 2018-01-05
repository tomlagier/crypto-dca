import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { mutate } from '../../graphql';

export interface Option {
  id: string;
  name: string;
  value: string;
}

export interface OptionsProps {
  data?: {
    loading?: boolean;
    options?: Option[];
  };
}

export const walletFields = `
  id
  name
  address
  local
`;

// graphQL query and selector
export const WALLETS = gql`
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

// Create
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

// Update
interface UpdateWalletArgs {
  id: string;
  name?: string;
  address?: string;
  local?: boolean;
}

interface UpdateWalletResult {
  data?: {
    updateWallet?: Wallet;
  };
}

const UPDATE_WALLET = gql`
  mutation updateWallet($id: String!, $name: String, $address: String, $local: Boolean) {
    updateWallet(id: $id, name: $name, address: $address, local: $local) {
      ${walletFields}
    }
  }
`;

const updateExistingWallet = (
  proxy: any,
  args: UpdateWalletArgs
) => {
  const walletsQuery = proxy.readQuery({
    query: WALLETS
  }) as { wallets: Wallet[] };
  const { wallets } = walletsQuery;

  const existingWallet = wallets.find(
    searchWallet => searchWallet.id === args.id
  );

  const idx = wallets.indexOf(existingWallet);

  walletsQuery.wallets[idx] = Object.assign(
    {},
    existingWallet,
    args
  );

  proxy.writeQuery({
    query: WALLETS,
    data: walletsQuery
  });
};

export const updateWallet = (args: UpdateWalletArgs) =>
  mutate({
    mutation: UPDATE_WALLET,
    variables: args,
    update: (
      proxy,
      { data: { updateWallet: wallet } }: UpdateWalletResult
    ) => {
      updateExistingWallet(proxy, args);
    }
  });

// Delete
const DELETE_WALLET = gql`
  mutation deleteWallet($id: String!) {
    deleteWallet(id: $id) {
      success
    }
  }
`;

interface DeleteWalletArgs {
  id: string;
}

interface SuccessResponse {
  success: boolean;
}

interface DeleteResponse {
  data?: SuccessResponse;
}

export const deleteWallet = ({ id }: DeleteWalletArgs) =>
  mutate({
    mutation: DELETE_WALLET,
    variables: { id },
    update: (
      proxy,
      { data: { success } }: DeleteResponse
    ) => {
      const walletsQuery = proxy.readQuery({
        query: WALLETS
      }) as { wallets: Wallet[] };
      const nextWallets = walletsQuery.wallets.filter(
        wallet => wallet.id !== id
      );
      proxy.writeQuery({
        query: WALLETS,
        data: { wallets: nextWallets }
      });
    }
  });
