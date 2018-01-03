import * as React from 'react';
import styles from './index.css';
import { Coin } from '../../services/coins';
import {
  Table,
  TableHead,
  TableCell,
  TableRow
} from 'react-toolbox/lib/table';
import CoinRow from '../CoinRow';
import { updateCoin } from '../../services/coins';
import {
  Wallet,
  withWallets,
  filterWallets
} from '../../services/wallets';
import { withApollo, compose } from 'react-apollo';

const { CoinTable: coinTableClass } = styles;

interface CoinTableProps {
  coins: Coin[];
  remove: Function;
  toggleSidebar: Function;
  localWallets: Wallet[];
  exchangeWallets: Wallet[];
}

const CoinTable = ({
  coins = [],
  remove,
  toggleSidebar,
  localWallets,
  exchangeWallets
}: CoinTableProps) => (
  <Table
    className={coinTableClass}
    multiSelectable={false}
    selectable={false}
  >
    <TableHead>
      <TableCell>Active</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Code</TableCell>
      <TableCell>Fee Tolerance</TableCell>
      <TableCell>Portfolio Weight</TableCell>
      <TableCell>Local amount</TableCell>
      <TableCell>Exchange amount</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>Local Wallet</TableCell>
      <TableCell>Exchange Wallet</TableCell>
    </TableHead>
    {coins &&
      coins.map(coin => {
        return (
          <TableRow key={coin.id}>
            <CoinRow
              form={coin.id}
              coin={coin}
              remove={remove}
              localWallets={localWallets}
              exchangeWallets={exchangeWallets}
              initialValues={Object.assign({}, coin, {
                localWallet: coin.localWallet.id,
                exchangeWallet: coin.exchangeWallet.id
              })}
              onSubmit={updateCoin}
            />
          </TableRow>
        );
      })}
  </Table>
);

export default compose(
  withApollo,
  withWallets,
  filterWallets
)(CoinTable);
