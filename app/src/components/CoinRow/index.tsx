import { default as React, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Coin } from '../../services/coins';
import { Wallet } from '../../services/wallets';
import { TableCell } from 'react-toolbox/lib/table';
import { Button } from 'react-toolbox/lib/button';
import { RFCheckbox } from '../Input';
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
  coin: {
    id,
    active,
    name,
    code,
    localWallet,
    exchangeWallet,
    feeTolerance,
    portfolioWeight,
    localAmount,
    exchangeAmount,
    purchaseAmount
  },
  localWallets,
  exchangeWallets,
  remove,
  dirty,
  submit
}: CoinRowProps) => {
  return (
    <Fragment>
      <TableCell>
        <Field
          name="active"
          component={RFCheckbox}
          value={active}
        />
      </TableCell>
      <EditableTableCell name="name" value={name} />
      <EditableTableCell name="code" value={code} />
      <EditableTableCell
        name="feeTolerance"
        value={feeTolerance}
      />
      <EditableTableCell
        name="portfolioWeight"
        value={portfolioWeight.toString()}
      />
      <TableCell>{localAmount}</TableCell>
      <TableCell>{exchangeAmount}</TableCell>
      <TableCell>{purchaseAmount}</TableCell>
      <TableCell>
        {localWallet &&
          localWallets && (
            <CreateWalletDropdown
              name="local"
              wallets={localWallets}
              current={localWallet.id}
            />
          )}
      </TableCell>
      <TableCell>
        {exchangeWallet &&
          exchangeWallets && (
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
