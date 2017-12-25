import * as React from 'react';
import ReactDOM from 'react-dom';
import CoinTableRow from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoinTableRow />, div);
});
