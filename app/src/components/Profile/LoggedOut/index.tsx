import * as React from 'react';
import { Button } from 'react-toolbox/lib/button';

export default ({ loading, onClick }: {
  loading: boolean,
  onClick: Function
}) => (
  <Button
    label="Log In"
    onClick={onClick}
    raised={true}
    primary={true}
    disabled={loading}
  />
);