import * as React from 'react';
import styles from './index.css';
import AddCoinDialog from '../AddCoinDialog';
import { Button } from 'react-toolbox/lib/button';

const { AddCoinSection: addCoinSectionClass } = styles;

interface AddCoinSectionProps {
  add: Function;
  save: Function;
  close: Function;
  active: boolean;
}

const AddCoinSection = ({ add, save, active, close }: AddCoinSectionProps) => (
  <div className={addCoinSectionClass}>
    <Button onClick={() => add()}>New coin</Button>
    <AddCoinDialog active={active} add={save} close={close} />
  </div>
);

export default AddCoinSection;
