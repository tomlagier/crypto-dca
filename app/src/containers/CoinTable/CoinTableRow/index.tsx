import * as React from 'react';
import styles from './index.css';

const {
  CoinTableRow: coinTableRowClass
} = styles;

interface CoinTableRowProps {

}

const CoinTableRow = (
  {

  }: CoinTableRowProps
) => (
  <div className={coinTableRowClass}>

  </div>
);

export default CoinTableRow;
