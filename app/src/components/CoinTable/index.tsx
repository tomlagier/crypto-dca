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

const { CoinTable: coinTableClass } = styles;

interface CoinTableProps {
  coins: Coin[];
  remove: Function;
  toggleSidebar: Function;
}

const CoinTable = ({
  coins = [],
  remove,
  toggleSidebar
}: CoinTableProps) => (
  <Table
    className={coinTableClass}
    multiSelectable={false}
    selectable={false}
  >
    <TableHead>
      <TableCell>Name</TableCell>
      <TableCell>Code</TableCell>
      <TableCell>Local Wallet</TableCell>
      <TableCell>Exchange Wallet</TableCell>
    </TableHead>
    {coins.map(coin => {
      return (
        <TableRow key={coin.id}>
          <CoinRow
            form={coin.id}
            coin={coin}
            remove={remove}
            initialValues={coin}
            onSubmit={(values: any) => console.log(values)}
          />
        </TableRow>
      );
    })}
  </Table>
);

export default CoinTable;
