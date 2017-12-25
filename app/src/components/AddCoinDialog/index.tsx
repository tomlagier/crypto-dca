import * as React from 'react';
import styles from './index.css';
import { Dialog } from 'react-toolbox/lib/dialog';
import { reduxForm, Field } from 'redux-form';
import Input from '../Input';

const { AddCoinDialog: addCoinDialogClass } = styles;

interface AddCoinDialogProps {
  active: boolean;
  add: Function;
  close: Function;
}

const AddCoinDialog = ({
  active,
  close
}: AddCoinDialogProps) => (
  <Dialog
    active={active}
    className={addCoinDialogClass}
    onOverlayClick={close}
    onEscKeyDown={close}
  >
    <Field
      name="name"
      label="Name"
      type="text"
      required={true}
      component={Input}
    />
  </Dialog>
);

export default reduxForm({
  form: 'addCoin'
})(AddCoinDialog);
