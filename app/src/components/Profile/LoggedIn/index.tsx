import * as React from 'react';
import { Button } from 'react-toolbox/lib/button';

export default (
  { name, onClick }:
    { name: String, onClick: Function }
) => (
  <span>
    Logged in as {name}.
    <Button
      label="Log Out"
      onClick={onClick}
      raised={true}
      primary={true}
    />
  </span>
);