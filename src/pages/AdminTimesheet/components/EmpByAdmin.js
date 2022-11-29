import React from "react";
import { useState, useEffect } from "react";
import { secure } from "../../../Secret";

export default function EmpByAdmin({ ...props }) {
  let callbackFunction = props.callback;

  function empSelected(event) {  
  let  dataFromChild = event.target.innerText;
    callbackFunction(dataFromChild)
  }

  return (
    <div
      value={props.Emp.fields.id}
      className="employee-row"
      role="button"
      onClick={(event) => empSelected(event)}
    >
      {props.Emp.fields["Preferred Name"]}
    </div>
  );
}
