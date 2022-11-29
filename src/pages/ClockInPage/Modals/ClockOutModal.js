import React, { useState, } from "react";
import "./ClockOutModal.css";

function ClockOutModal(props) {
  let d = new Date();
  let n = d.toLocaleTimeString();



  return props.trigger ? (
    <div className="clockout-modal-background">
      <div className="clockout-modal-container">
        {props.children}
        <div className="clockout-modal-text">Hello <br/>{props.name}! <br/>Clocked out At {n}</div><br/>
        <div className="clockout-modal-text-mobile">Hello <br/>{props.name}! <br/>Clocked out At {n}</div><br/>

        <div className="modal-time"></div>
        <div className="pinner"></div>
        
      </div>
    </div>
  ) : (
    ""
  );
}

export default ClockOutModal;