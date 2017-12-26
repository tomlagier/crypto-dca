import * as React from 'react';
import ReactDOM from 'react-dom';
import WalletTable from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WalletTable />, div);
});
