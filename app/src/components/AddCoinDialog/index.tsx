import * as React from 'react';
import styles from './index.css';
import { Dialog } from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import { withApollo, compose } from 'react-apollo';
import {
  Wallet,
  withWallets
} from '../../services/wallets';
import { reduxForm, Field, Form } from 'redux-form';
import { GraphQLError } from '../../types/error';
import Input from '../Input';
import CreateWalletDropdown from '../CreateWalletDropdown';

const { AddCoinDialog: addCoinDialogClass } = styles;

interface AddCoinDialogProps {
  active: boolean;
  add: Function;
  close: Function;
  submit?: Function;
  handleSubmit?: Function;
  errors?: GraphQLError[];
  localWallets: Wallet[];
  exchangeWallets: Wallet[];
}

const AddCoinDialog = ({
  active,
  add,
  close,
  submit,
  handleSubmit,
  errors,
  localWallets,
  exchangeWallets
}: AddCoinDialogProps) => (
  <Dialog
    active={active}
    className={addCoinDialogClass}
    onOverlayClick={close}
    onEscKeyDown={close}
  >
    <h3>Add a coin</h3>
    {errors &&
      errors.map(({ message }, i) => (
        <span key={i} className="error">
          {message}
        </span>
      ))}
    <Form onSubmit={handleSubmit(add)}>
      <Field
        name="name"
        label="Name (human readable)"
        type="text"
        required={true}
        component={Input}
      />
      <Field
        name="code"
        label="Code (from exchange)"
        type="text"
        required={true}
        component={Input}
      />
      <h4>Local wallet</h4>
      <CreateWalletDropdown
        name="local"
        wallets={localWallets}
      />
      <h4>Exchange wallet</h4>
      <CreateWalletDropdown
        name="exchange"
        wallets={exchangeWallets}
      />
      <Button onClick={submit}>Submit</Button>
    </Form>
  </Dialog>
);

interface FilterWalletsProps {
  wallets: Wallet[];
  [key: string]: any;
}

const filterWallets = (Component: any) => ({
  wallets,
  ...props
}: FilterWalletsProps) => (
  <Component
    localWallets={
      wallets && wallets.filter(wallet => wallet.local)
    }
    exchangeWallets={
      wallets && wallets.filter(wallet => !wallet.local)
    }
    {...props}
  />
);

export default compose(
  withApollo,
  withWallets,
  filterWallets,
  reduxForm({
    form: 'addCoin',
    initialValues: {
      localWallet: 'new',
      exchangeWallet: 'new'
    }
  })
)(AddCoinDialog);
