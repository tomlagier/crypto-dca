import * as React from 'react';
import styles from './index.css';
import { Switch } from 'react-toolbox/lib/switch';
import { Button } from 'react-toolbox/lib/button';
import { Field, reduxForm } from 'redux-form';
import { RFControl } from '../Input';

const { HomeOptions: homeOptionsClass } = styles;

interface HomeOptionsProps {
  dirty?: boolean;
  submit?: Function;
}

const HomeOptions = ({
  dirty,
  submit
}: HomeOptionsProps) => (
  <div className={homeOptionsClass}>
    <Field
      component={RFControl(Switch)}
      name="purchasingEnabled"
      label="Enable purchases"
    />
    {dirty && <Button onClick={submit}>Save</Button>}
  </div>
);

export default reduxForm({
  form: 'homeOptions'
})(HomeOptions);
