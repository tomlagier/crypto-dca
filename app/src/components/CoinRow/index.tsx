import { default as React, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { Coin } from '../../services/coins';
import { TableCell } from 'react-toolbox/lib/table';
import { Button } from 'react-toolbox/lib/button';
import EditableTableCell from '../EditableTableCell';

interface CoinRowProps {
  coin: Coin;
  remove: Function;
  form: string;
  initialValues: Coin;
  dirty?: boolean;
  submit?: Function;
  onSubmit: Function;
}

const CoinRow = ({
  coin: { id, name, code, localWallet, exchangeWallet },
  remove,
  dirty,
  submit
}: CoinRowProps) => {
  return (
    <Fragment>
      <EditableTableCell name="name" value={name} />
      <EditableTableCell name="code" value={code} />
      <TableCell>
        {localWallet && localWallet.name}
      </TableCell>
      <TableCell>
        {exchangeWallet && exchangeWallet.name}
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

export default reduxForm({})(CoinRow);
