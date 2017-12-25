import * as React from 'react';
import styles from './index.css';
import { Button } from 'react-toolbox/lib/button';
import { Coin } from '../../services/coins';

const {
  CoinTable: coinTableClass
} = styles;

interface CoinTableProps {
  coins: Coin[];
  remove: Function;
  toggleSidebar: Function;
}

const CoinTable = (
  {
    coins,
    remove,
    toggleSidebar
  }: CoinTableProps
) => (
    <div className={coinTableClass}>
    {coins && coins.map(coin => (
      <div key={coin.id}>
        <span>Name: {coin.name}</span>
        <span>Code: {coin.code}</span>
        <Button onClick={() => remove({ id: coin.id })}>
          Delete
        </Button>
      </div>
    ))}
  </div>
);

export default CoinTable;
