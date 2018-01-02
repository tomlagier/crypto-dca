import { default as React, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { Coin } from '../../services/coins';
import { Wallet } from '../../services/wallets';
import { TableCell } from 'react-toolbox/lib/table';
import { Button } from 'react-toolbox/lib/button';
import EditableTableCell from '../EditableTableCell';
import CreateWalletDropdown from '../CreateWalletDropdown';

interface CoinRowProps {
  coin: Coin;
  remove: Function;
  form: string;
  initialValues: Coin;
  dirty?: boolean;
  submit?: Function;
  onSubmit: Function;
  localWallets: Wallet[];
  exchangeWallets: Wallet[];
}

const CoinRow = ({
  coin: { id, name, code, localWallet, exchangeWallet },
  localWallets,
  exchangeWallets,
  remove,
  dirty,
  submit
}: CoinRowProps) => {
  return (
    <Fragment>
      <EditableTableCell name="name" value={name} />
      <EditableTableCell name="code" value={code} />
      <TableCell>
        {localWallet && (
          <CreateWalletDropdown
            name="local"
            wallets={localWallets}
            current={localWallet.id}
          />
        )}
      </TableCell>
      <TableCell>
        {exchangeWallet && (
          <CreateWalletDropdown
            name="exchange"
            wallets={exchangeWallets}
            current={exchangeWallet.id}
          />
        )}
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
})(CoinRow);
