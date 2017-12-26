import * as React from 'react';
import styles from './index.css';
import AddCoinDialog from '../AddCoinDialog';
import { Button } from 'react-toolbox/lib/button';
import { GraphQLError } from '../../services/error';

const { AddCoinSection: addCoinSectionClass } = styles;

interface AddCoinSectionProps {
  add: Function;
  save: Function;
  close: Function;
  active: boolean;
  errors: GraphQLError[];
}

const AddCoinSection = ({
  add,
  save,
  active,
  close,
  errors
}: AddCoinSectionProps) => (
  <div className={addCoinSectionClass}>
    <Button onClick={() => add()}>New coin</Button>
    <AddCoinDialog
      active={active}
      add={save}
      close={close}
      errors={errors}
    />
  </div>
);

export default AddCoinSection;
