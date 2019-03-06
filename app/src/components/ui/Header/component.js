import React from "react";
import './style.css';

export default function Header(props) {
  return (
    <div className={'Header'}>
      <div className={'HeaderLeft'}>
        <img src='/images/logo.png' width="200" />
      </div>
      <div className={'HeaderRight'}>
        {props.navigation}
      </div>
    </div>
  )
}
