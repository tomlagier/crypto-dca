import React from 'react';
import ReactDOM from 'react-dom';
import WalletDashboard from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WalletDashboard />, div);
});
