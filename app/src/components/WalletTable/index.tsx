import * as React from 'react';
import styles from './index.css';
import {
  Wallet,
  updateWallet
} from '../../services/wallets';
import {
  Table,
  TableHead,
  TableCell,
  TableRow
} from 'react-toolbox/lib/table';
import WalletRow from '../WalletRow';

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
  <Table
    className={walletTableClass}
    multiSelectable={false}
    selectable={false}
  >
    <TableHead>
      <TableCell>Name</TableCell>
      <TableCell>Address</TableCell>
      <TableCell>Location</TableCell>
    </TableHead>
    {wallets &&
      wallets.map(wallet => {
        return (
          <TableRow key={wallet.id}>
            <WalletRow
              form={wallet.id}
              wallet={wallet}
              remove={remove}
              initialValues={Object.assign({}, wallet, {
                local: wallet.local ? 'local' : 'exchange'
              })}
              onSubmit={(
                args: Wallet & { local: string }
              ) => {
                updateWallet(
                  Object.assign({}, args, {
                    local: args.local === 'local'
                  })
                );
              }}
            />
          </TableRow>
        );
      })}
  </Table>
);

export default WalletTable;
