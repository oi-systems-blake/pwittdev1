import React, { useState, } from "react";
import "./ClockinModal.style.css";

function ClockInModal(props) {
  let d = new Date();
  let n = d.toLocaleTimeString();



  return props.trigger ? (
    <div className="clockin-modal-background">
      <div className="clockin-modal-container">
        {props.children}
        <div className="clockin-modal-text">Hello <br/>{props.name}! <br/>Clocked in At {n}</div><br/>
        <div className="clockin-modal-text-mobile">Hello <br/>{props.name}! <br/>Clocked in At {n}</div><br/>
        <div className="modal-time"></div>
        <div className="pinner"></div>
        </div>
      
    </div>
  ) : (
    ""
  );
}

export default ClockInModal;
