import React from "react";
import "./SideButton.css"

export default function SideButton(props) {
  let d = new Date();
  let n = d.toLocaleTimeString();

  return props.trigger ? (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-container-content">
          {props.children}
          <h4 className="modal-text">
            New Modal!!
          </h4>
          <br />
          <h1 className="modal-time">{n}</h1>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
