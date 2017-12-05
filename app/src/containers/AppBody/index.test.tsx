import React from 'react';
import ReactDOM from 'react-dom';
import AppBody from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppBody />, div);
});
