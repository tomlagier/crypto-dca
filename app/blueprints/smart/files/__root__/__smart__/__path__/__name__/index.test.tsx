import React from 'react';
import ReactDOM from 'react-dom';
import <%= pascalEntityName %> from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<<%= pascalEntityName %> />, div);
});
