import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ClockInModal from "../Modals/ClockInModal.js";

export default function ClockInButton() {
  
  const [clockInButtonPopup, setClockInButtonPopup] = useState(false);
 
  function ClockInFunction() {
    setClockInButtonPopup(true);
    setTimeout(() => {
      setClockInButtonPopup(false);
    }, 2500);
  }
  return (
    <div className="clock-clock-button">
      <Button
        className="clock special-button"
        variant="warning"
        onClick={ClockInFunction}
      >
        Clock In/Out
      </Button>
      <ClockInModal
        trigger={clockInButtonPopup}
        setTrigger={setClockInButtonPopup}
      />
    </div>
  );
}
