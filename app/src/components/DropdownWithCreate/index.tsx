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
  current?: string;
}

interface DropdownWithCreateState {
  newSelected: boolean;
  currentValue: string;
  initialValue: string;
}

export default class DropdownWithCreate extends Component<
  DropdownWithCreateProps,
  DropdownWithCreateState
> {
  constructor(props: DropdownWithCreateProps) {
    super(props);

    this.state = {
      newSelected: !props.current,
      currentValue: props.current || 'new',
      initialValue: props.current
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

  // Dumb hack to hide form when we successfully create
  componentWillReceiveProps({
    current
  }: DropdownWithCreateProps) {
    const { newSelected, initialValue } = this.state;
    if (
      current &&
      initialValue &&
      newSelected &&
      current !== initialValue
    ) {
      this.setState({
        newSelected: false,
        initialValue: current
      });
    }
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
          onChange={this.handleChange}
          component={RFControl(Dropdown)}
        />
        {newSelected && newForm}
      </div>
    );
  }
}
