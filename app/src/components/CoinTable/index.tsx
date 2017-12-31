import * as React from 'react';
import styles from './index.css';
// import { Button } from 'react-toolbox/lib/button';
import { Coin } from '../../services/coins';
import {
  Table,
  TableHead,
  TableRow,
  TableCell
} from 'react-toolbox/lib/table';

const { CoinTable: coinTableClass } = styles;

interface CoinTableProps {
  coins: Coin[];
  remove: Function;
  toggleSidebar: Function;
}

const CoinTable = ({
  coins,
  remove,
  toggleSidebar
}: CoinTableProps) => (
  <Table className={coinTableClass}>
    <TableHead>
      <TableCell>Name</TableCell>
      <TableCell>Code</TableCell>
      <TableCell>Local Wallet</TableCell>
      <TableCell>ExchangeWallet</TableCell>
    </TableHead>
    {coins &&
      coins.map(
        ({
          id,
          name,
          code,
          localWallet,
          exchangeWallet
        }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{code}</TableCell>
            <TableCell>
              {localWallet && localWallet.name}
            </TableCell>
            <TableCell>
              {exchangeWallet && exchangeWallet.name}
            </TableCell>
          </TableRow>
        )
      )}
  </Table>
);

export default CoinTable;
