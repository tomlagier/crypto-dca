import * as React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { actions } from '../../../services/auth/state';

export default () => (
  <Button
    label="Log In"
    onClick={actions.auth.logIn}
    raised={true}
    primary={true}
  />
);