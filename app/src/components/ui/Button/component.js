// @flow
import React from "react";
import './style.css';

type Props = {
  /**
   * Button value.
   */
  value?: string,

  /**
   * Callback for onClick event.
   */
  onClick?: Function,

  /**
   * If the button is disabled.
   */
  disabled: boolean
};

export default function ButtonComponent(props: Props) {
  return (
    <button
      type={'button'}
      className={`ButtonComponent`}
      onClick={props.onClick ? props.onClick : () => {}}
      disabled={props.disabled || false}
    >
      {props.value}
    </button>
  );
}
