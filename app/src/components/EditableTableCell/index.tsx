import { default as React, Component } from 'react';
import styles from './index.css';
import { Field } from 'redux-form';
import Input from '../Input';
import { TableCell } from 'react-toolbox/lib/table';

const {
  EditableTableCell: editableTableCellClass
} = styles;

interface EditableTableCellProps {
  name: string;
  value: string;
}
interface EditableTableCellState {
  disabled: boolean;
}

export default class EditableTableCell extends Component<
  EditableTableCellProps,
  EditableTableCellState
> {
  input: any;

  constructor(props: EditableTableCellProps) {
    super(props);
    this.state = {
      disabled: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    this.setState({ disabled: false }, () =>
      this.input.focus()
    );
  }

  handleBlur() {
    this.setState({ disabled: true });
  }

  render() {
    const { name, value } = this.props;
    const { disabled } = this.state;
    return (
      <TableCell onClick={this.handleClick}>
        <Field
          name={name}
          value={value}
          className={editableTableCellClass}
          component={Input}
          disabled={disabled}
          onBlur={this.handleBlur}
          innerRef={(input: any) => (this.input = input)}
        />
      </TableCell>
    );
  }
}
