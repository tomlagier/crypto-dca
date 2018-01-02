import * as React from 'react';
import DropdownWithCreate from '../DropdownWithCreate';
import AddWalletFieldGroup from '../AddWalletFieldGroup';
import { Wallet } from '../../services/wallets';
import { toTitleCase } from '../../utils/toTitleCase';

interface CreateWalletDropdownProps {
  name: string;
  wallets: Wallet[];
  startNew: boolean;
}

const CreateWalletDropdown = ({
  name,
  wallets,
  startNew
}: CreateWalletDropdownProps) => (
  <DropdownWithCreate
    type="wallet"
    name={`${name}Wallet`}
    startNew={startNew}
    options={
      wallets &&
      wallets.map(wallet => ({
        label: wallet.name,
        value: wallet.id
      }))
    }
    newForm={
      <AddWalletFieldGroup
        prefix={`new${toTitleCase(name)}Wallet`}
      />
    }
  />
);

export default CreateWalletDropdown;
