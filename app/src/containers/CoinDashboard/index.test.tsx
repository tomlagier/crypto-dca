import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CoinDashboard from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoinDashboard />, div);
});
