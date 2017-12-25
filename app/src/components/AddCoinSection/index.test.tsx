import * as React from 'react';
import ReactDOM from 'react-dom';
import AddCoinSection from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCoinSection />, div);
});
