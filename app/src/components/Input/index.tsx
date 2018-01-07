import * as React from 'react';
import { Input as RTInput } from 'react-toolbox/lib/input';
import { Checkbox as RTCheckbox } from 'react-toolbox/lib/checkbox';
import { Switch as RTSwitch } from 'react-toolbox/lib/switch';

interface InputProps {
  name: string;
  [key: string]: any;
}

export const RFControl = (Component: any) => ({
  input,
  meta,
  defaultValue,
  ...props
}: InputProps) => {
  return (
    <Component
      {...input}
      {...props}
      error={(meta.touched && meta.error) || ''}
    />
  );
};

export default RFControl(RTInput);

export const RFCheckbox = RFControl(
  ({ value, ...props }: InputProps) => (
    <RTCheckbox {...props} checked={value} />
  )
);

export const RFSwitch = RFControl(
  ({ value, ...props }: InputProps) => (
    <RTSwitch {...props} checked={value} />
  )
);
