import * as React from 'react';
import styles from './index.css';
import {
  RadioGroup,
  RadioButton
} from 'react-toolbox/lib/radio';

const { Radio: radioClass } = styles;

interface RadioOption {
  label: string;
  value: string;
  selected?: boolean;
}

interface RadioProps {
  defaultValue: string;
  input: {
    value: string;
    onChange: Function;
  };
  label: string;
  options: RadioOption[];
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
