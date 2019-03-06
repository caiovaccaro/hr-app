// @flow
import React from "react";
import './style.css';

type Props = {
  /**
   * Input placeholder.
   */
  placeholder?: string,

  /**
   * Input already typed value.
   */
  value?: string,

  /**
   * Callback for onChange event.
   */
  onChange?: Function,

  /**
   * Callback for onBlur event.
   */
  onBlur?: Function,

  /**
   * If the input have an icon and the keyword.
   */
  icon?: string,

  /**
   * If the input is disabled.
   */
  disabled: boolean,

  /**
   * Custom padding.
   */
  padding?: number,

  /**
   * Input type
   */
  type: string,

  /**
   * Input name for reference
   */
  name?: string
};

export default class InputComponent extends React.Component<Props> {
  render() {
    return (
      <input
        name={this.props.name ? this.props.name : ''}
        type={this.props.type}
        className={`InputComponent`}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange ? this.props.onChange : () => {}}
      />
    );
  }
}
