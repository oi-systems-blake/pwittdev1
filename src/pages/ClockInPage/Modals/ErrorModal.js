import React, { useState } from "react";
import "./ErrorModal.css";

function ClockInModal(props) {
  let d = new Date();
  let n = d.toLocaleTimeString();

  return props.trigger ? (
    <div className="error-modal-background">
      <div className="error-modal-container">
          {props.children}
          <div className="error-modal-text">
            <p>Pin Not Found.</p>
            <p>Please Try Again.</p>
          </div>
          <div className="error-modal-text-mobile">
          <p>Pin Not Found.</p>
            <p>Please Try Again.</p>
          </div>
          <br />
          
        
      </div>
    </div>
  ) : (
    ""
  );
}

export default ClockInModal;
