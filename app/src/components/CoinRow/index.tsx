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
}

const CoinRow = ({
  coin: { id, name, code, localWallet, exchangeWallet },
  remove
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
        <Button onClick={() => remove({ id })}>
          Delete
        </Button>
      </TableCell>
    </Fragment>
  );
};

export default reduxForm({})(CoinRow);
