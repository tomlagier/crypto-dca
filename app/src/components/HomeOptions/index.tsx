import * as React from 'react';
import styles from './index.css';
import { Button } from 'react-toolbox/lib/button';
import { Field, reduxForm } from 'redux-form';
import { RFSwitch, default as RFInput } from '../Input';
import { withApollo, compose } from 'react-apollo';
import {
  Option,
  withOptions,
  updateOptions
} from '../../services/options';

const { HomeOptions: homeOptionsClass } = styles;

interface HomeOptionsProps {
  dirty?: boolean;
  submit?: Function;
  initialValues: any;
}

const HomeOptions = ({
  dirty,
  submit
}: HomeOptionsProps) => (
  <div className={homeOptionsClass}>
    <Field
      component={RFSwitch}
      name="purchaseEnabled"
      label="Enable purchases"
    />
    <Field
      component={RFInput}
      name="spendAmount"
      label="Amount to spend per [increment]"
    />
    <Field
      component={RFInput}
      name="interval"
      label="Interval to purchase at (in hours)"
    />
    {dirty && <Button onClick={submit}>Save</Button>}
  </div>
);

const HomeOptionsForm = reduxForm({
  form: 'homeOptions',
  onSubmit: (options: any) =>
    updateOptions({
      options: Object.entries(options).map(
        ([key, value]) => ({
          name: key,
          value: value.toString()
        })
      )
    })
})(HomeOptions);

const HomeOptionsWithOptions = ({
  options,
  ...props
}: {
  options: Option[];
}) => {
  const {
    purchaseEnabled = 'false',
    spendAmount = '0',
    interval = '0'
  } = options
    ? options.reduce(
        (all, { name, value }) => {
          all[name] = value;
          return all;
        },
        {} as { [key: string]: string }
      )
    : {};

  return (
    <HomeOptionsForm
      initialValues={{
        purchaseEnabled: purchaseEnabled === 'true',
        spendAmount,
        interval
      }}
      {...props}
    />
  );
};

export default compose(
  withOptions([
    'purchaseEnabled',
    'spendAmount',
    'interval'
  ]),
  withApollo
)(HomeOptionsWithOptions);
