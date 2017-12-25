import * as React from 'react';
import { Input as RTInput } from 'react-toolbox/lib/input';

interface InputProps {
  name: string;
  [key: string]: any;
}

export default ({ input, meta, ...props }: InputProps) => (
  <RTInput
    {...input}
    {...props}
    error={meta.touched && meta.error}
  />
);
