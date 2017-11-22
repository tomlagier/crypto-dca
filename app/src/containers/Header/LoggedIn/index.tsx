import * as React from 'react';
import { Button } from 'react-toolbox/lib/button';

export default ({ name, logout }: { name: String, logout: Function }) => (
  <span>
    Logged in as {name}.
    <Button
      label="Log Out"
      onClick={logout}
      raised={true}
      primary={true}
    />
  </span>
);