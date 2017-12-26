import * as React from 'react';
import styles from './index.css';
import Input from '../Input';
import Radio from '../Radio';
import { Field } from 'redux-form';

const {
  AddWalletFieldGroup: addWalletFieldGroupClass
} = styles;

interface AddWalletFieldGroupProps {
  prefix?: string;
  showExchange?: boolean;
}

const generateName = (prefix: string, name: string) => {
  return prefix ? `${prefix}.${name}` : name;
};

const AddWalletFieldGroup = ({
  prefix,
  showExchange
}: AddWalletFieldGroupProps) => (
  <div className={addWalletFieldGroupClass}>
    <Field
      name={generateName(prefix, 'name')}
      label="Name (human readable)"
      type="text"
      required={true}
      component={Input}
    />
    <Field
      name={generateName(prefix, 'address')}
      label="Address (local or exchange)"
      type="text"
      required={true}
      component={Input}
    />
    {showExchange && (
      <Field
        name={generateName(prefix, 'local')}
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
    )}
  </div>
);

export default AddWalletFieldGroup;
