import * as React from 'react';
import { Input as RTInput } from 'react-toolbox/lib/input';

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
