import * as React from 'react';
import styles from './index.css';
import { Dialog } from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import { reduxForm, Form } from 'redux-form';
import { GraphQLError } from '../../types/error';
import AddWalletFieldGroup from '../AddWalletFieldGroup';

const { AddWalletDialog: addWalletDialogClass } = styles;

interface AddWalletDialogProps {
  active: boolean;
  add: Function;
  close: Function;
  submit?: Function;
  handleSubmit?: Function;
  errors?: GraphQLError[];
}

interface AddWalletForm {
  name: string;
  address: string;
  local?: string;
}

const AddCoinDialog = ({
  active,
  add,
  close,
  submit,
  handleSubmit,
  errors
}: AddWalletDialogProps) => (
  <Dialog
    active={active}
    className={addWalletDialogClass}
    onOverlayClick={close}
    onEscKeyDown={close}
  >
    <h3>Add a wallet</h3>
    {errors &&
      errors.map(({ message }, i) => (
        <span key={i} className="error">
          {message}
        </span>
      ))}
    <Form
      onSubmit={handleSubmit(
        ({ local, ...values }: AddWalletForm) => {
          add({
            ...values,
            local: local === 'exchange' ? false : true
          });
        }
      )}
    >
      <AddWalletFieldGroup showExchange={true} />
      <Button onClick={submit}>Submit</Button>
    </Form>
  </Dialog>
);

export default reduxForm({
  form: 'addWallet'
})(AddCoinDialog);
