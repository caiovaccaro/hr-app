import React from "react";
import Header from "../Header";
import ActivityComponent from "../../Activity";
import './style.css';

export default function Template(props) {
  return (
    <React.Fragment>
      <div className={'TemplateLeft'}>
        <Header navigation={props.navigation} />
        {props.main}
      </div>
      <div className={'TemplateRight'}>
        <ActivityComponent />
      </div>
    </React.Fragment>
  )
}
