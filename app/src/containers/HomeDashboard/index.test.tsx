import React from 'react';
import ReactDOM from 'react-dom';
import HomeDashboard from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeDashboard />, div);
});
