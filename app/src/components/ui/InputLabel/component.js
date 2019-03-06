import React from "react";
import './style.css';

export default function InputLabel(props) {
  return (
    <div className={'InputLabel'}>
      {props.label}
    </div>
  )
}
