import * as React from 'react';
import styles from './index.css';
import { Button } from 'react-toolbox/lib/button';
import { Wallet } from '../../services/wallets';

const { WalletTable: walletTableClass } = styles;

interface WalletTableProps {
  wallets: Wallet[];
  remove: Function;
  toggleSidebar: Function;
}

const WalletTable = ({
  wallets,
  remove,
  toggleSidebar
}: WalletTableProps) => (
  <div className={walletTableClass}>
    {wallets &&
      wallets.map(wallet => (
        <div key={wallet.id}>
          <span>Name: {wallet.name}</span>
          <span>Address: {wallet.address}</span>
          <Button onClick={() => remove({ id: wallet.id })}>
            Delete
          </Button>
        </div>
      ))}
  </div>
);

export default WalletTable;
