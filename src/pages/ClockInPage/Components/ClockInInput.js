import React from "react";
import { useState } from "react";
import ClockInModal from "../Modals/ClockInModal";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ClockInInput() {
  const [clockInButtonPopup, setClockInButtonPopup] = useState(false);
  const [pin, setPin] = useState("");

  function ClockInFunction() {
    setClockInButtonPopup(true);
    setTimeout(() => {
      setClockInButtonPopup(false);
    }, 2500);
  }

  const handleChange = (event) => {
    setPin(event.target.value);
  };

  return (
    <>
      <div className="clock-clock-input">
        <input
          id="clock-clock-input-specific"
          type="password"
          placeholder="Enter 4 Digit Pin"
          onChange={handleChange}
          value={pin}
        ></input>
      </div>
      <div className="clock-clock-button">
        <button
          className="clock special-button"
          variant="warning"
          onClick={ClockInFunction}
        >
          Clock In/Out
        </button>
        <div className="clock-timesheet-button">
        <Link to="/viewtimesheet/:1245">
          <button id="clock-timesheet-button-specific" variant="warning">
            View Timesheet
          </button>
        </Link>
      </div>
        <ClockInModal
          pin={pin}
          trigger={clockInButtonPopup}
          setTrigger={setClockInButtonPopup}
        />
      </div>
    </>
  );
}
