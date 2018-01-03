import { default as React, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Wallet } from '../../services/wallets';
import { TableCell } from 'react-toolbox/lib/table';
import { Button } from 'react-toolbox/lib/button';
import Radio from '../Radio';
import EditableTableCell from '../EditableTableCell';

interface WalletRowProps {
  wallet: Wallet;
  remove: Function;
  form: string;
  initialValues: Wallet;
  dirty?: boolean;
  submit?: Function;
  onSubmit: Function;
}

const WalletRow = ({
  wallet: { id, name, address, local },
  remove,
  dirty,
  submit
}: WalletRowProps) => {
  return (
    <Fragment>
      <EditableTableCell name="name" value={name} />
      <EditableTableCell name="address" value={address} />
      <TableCell>
        <Field
          name="local"
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
      </TableCell>
      <TableCell>
        {dirty && (
          <Button onClick={() => submit()}>Save</Button>
        )}
        <Button onClick={() => remove({ id })}>
          Delete
        </Button>
      </TableCell>
    </Fragment>
  );
};

export default reduxForm({
  enableReinitialize: true
})(WalletRow);
