import * as React from 'react';
import styles from './index.css';
import { Button } from 'react-toolbox/lib/button';
import { Coin } from '../../services/coins';

const {
  CoinTable: coinTableClass
} = styles;

interface CoinTableProps {
  coins: Coin[];
  add: Function;
  remove: Function;
  toggleSidebar: Function;
}

const CoinTable = (
  {
    coins,
    add,
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
    <Button
      onClick={() =>
        add({
          name: 'Test',
          code: 'TEST'
        })
      }
    >
      Add a coin
    </Button>
    <Button onClick={toggleSidebar}>Toggle sidebar</Button>
  </div>
);

export default CoinTable;
