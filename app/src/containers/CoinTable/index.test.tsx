import * as React from 'react';
import ReactDOM from 'react-dom';
import CoinTable from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoinTable />, div);
});
