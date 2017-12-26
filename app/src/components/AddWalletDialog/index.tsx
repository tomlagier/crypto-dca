import * as React from 'react';
import styles from './index.css';
import { Dialog } from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import { reduxForm, Field, Form } from 'redux-form';
import { GraphQLError } from '../../services/error';
import Input from '../Input';
import Radio from '../Radio';

const { AddWalletDialog: addWalletDialogClass } = styles;

interface AddWalletDialogProps {
  active: boolean;
  add: Function;
  close: Function;
  submit?: Function;
  handleSubmit?: Function;
  errors?: GraphQLError[];
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
    <Form onSubmit={handleSubmit(add)}>
      <Field
        name="name"
        label="Name (human readable)"
        type="text"
        required={true}
        component={Input}
      />
      <Field
        name="address"
        label="Address (local or exchange)"
        type="text"
        required={true}
        component={Input}
      />
      <Field
        name="local"
        label="Wallet location"
        component={Radio}
        defaultValue="local"
        options={[
          {
            label: 'Local',
            value: 'local'
          },
          {
            label: 'Exchange',
            value: 'exchange'
          }
        ]}
      />
      <Button onClick={submit}>Submit</Button>
    </Form>
  </Dialog>
);

export default reduxForm({
  form: 'addWallet'
})(AddCoinDialog);
