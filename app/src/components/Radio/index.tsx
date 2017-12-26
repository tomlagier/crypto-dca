import * as React from 'react';
import styles from './index.css';
import {
  RadioGroup,
  RadioButton
} from 'react-toolbox/lib/radio';
import { Option } from '../../types/option';

const { Radio: radioClass } = styles;

interface RadioProps {
  defaultValue: string;
  input: {
    value: string;
    onChange: Function;
  };
  label: string;
  options: Option[];
}

const Radio = ({
  defaultValue,
  input: { value: formValue, onChange },
  options,
  label: formLabel
}: RadioProps) => (
  <span>
    <h4>{formLabel}</h4>
    <RadioGroup
      value={formValue || defaultValue}
      onChange={onChange}
      className={radioClass}
    >
      {options.map(({ label, value, selected }) => (
        <RadioButton
          key={value}
          label={label}
          value={value}
        />
      ))}
    </RadioGroup>
  </span>
);

export default Radio;
