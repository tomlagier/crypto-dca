import * as React from 'react';
import styles from './index.css';
import { Dialog } from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import { reduxForm, Field, Form } from 'redux-form';
import Input from '../Input';

const { AddCoinDialog: addCoinDialogClass } = styles;

interface AddCoinDialogProps {
  active: boolean;
  add: Function;
  close: Function;
  submit?: Function;
  handleSubmit?: Function;
}

const AddCoinDialog = ({
  active,
  add,
  close,
  submit,
  handleSubmit
}: AddCoinDialogProps) => (
  <Dialog
    active={active}
    className={addCoinDialogClass}
    onOverlayClick={close}
    onEscKeyDown={close}
  >
    <h3>Add a coin</h3>
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
      <Button onClick={submit}>Submit</Button>
    </Form>
  </Dialog>
);

export default reduxForm({
  form: 'addCoin'
})(AddCoinDialog);
