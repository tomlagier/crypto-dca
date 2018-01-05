import * as React from 'react';
import ReactDOM from 'react-dom';
import HomeOptions from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeOptions />, div);
});
