// @flow
import React from "react";
import './style.css';

type Props = {
  /**
   * Which icon to render from the SVG font.
   */
  icon: string,

  /**
   * Callback for when the icon is clicked.
   */
  onClick?: Function,

  /**
   * Optional override style for component.
   */
  style?: Object
};

/**
 * Icon generic component.
 * The CSS have a specific order: first any styles you pass through "className",
 * then the generic Icon CSS, the specific Icon CSS and lastly the props
 * "color" and "size".
 */
export default function Icon(props: Props) {
  const attrs = {};

  if (props.onClick) {
    attrs.onClick = props.onClick;
  }

  if (props.style) {
    attrs.style = props.style;
  }

  return (
    <i
      {...attrs}
      className={`
      IconComponent IconComponent--${props.icon}`}
    />
  );
}
