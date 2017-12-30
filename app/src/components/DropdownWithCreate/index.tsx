import { default as React, Component } from 'react';
import styles from './index.css';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Field } from 'redux-form';
import { Option } from '../../types/option';
import { RFControl } from '../Input';

const {
  DropdownWithCreate: dropdownWithCreateClass
} = styles;

interface DropdownWithCreateProps {
  name: string;
  type: string;
  options: Option[];
  newForm: JSX.Element;
  onChange?: Function;
}

interface DropdownWithCreateState {
  newSelected: boolean;
  currentValue: string;
}

class DropdownWithCreate extends Component<
  DropdownWithCreateProps,
  DropdownWithCreateState
> {
  constructor(props: DropdownWithCreateProps) {
    super(props);
    this.state = {
      newSelected: true,
      currentValue: 'new'
    };

    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getOptions() {
    const { options } = this.props;
    const newItem = {
      label: 'new',
      value: 'new'
    };

    return [newItem, ...options];
  }
  handleChange(e: any, value: string) {
    this.setState({
      currentValue: value,
      newSelected: value === 'new'
    });
  }
  render() {
    const { newSelected, currentValue } = this.state;
    const { newForm, name } = this.props;
    return (
      <div>
        <Field
          name={name}
          className={dropdownWithCreateClass}
          source={this.getOptions()}
          required={true}
          defaultValue={currentValue}
          value={currentValue}
          onChange={this.handleChange}
          component={RFControl(Dropdown)}
        />
        {newSelected && newForm}
      </div>
    );
  }
}

export default DropdownWithCreate;
