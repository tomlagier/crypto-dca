import * as React from 'react';
import styles from './index.css';
import AddWalletDialog from '../AddWalletDialog';
import { Button } from 'react-toolbox/lib/button';
import { GraphQLError } from '../../services/error';

const { AddWalletSection: addWalletSectionClass } = styles;

interface AddWalletSectionProps {
  add: Function;
  save: Function;
  close: Function;
  active: boolean;
  errors: GraphQLError[];
}

const AddWalletSection = ({
  add,
  save,
  active,
  close,
  errors
}: AddWalletSectionProps) => (
  <div className={addWalletSectionClass}>
    <Button onClick={() => add()}>New wallet</Button>
    <AddWalletDialog
      active={active}
      add={save}
      close={close}
      errors={errors}
    />
  </div>
);

export default AddWalletSection;
