import React from "react";
import './style.css';

export default function InputGroup(props) {
  return (
    <div className={'InputGroup'}>
      {props.children}
    </div>
  )
}
