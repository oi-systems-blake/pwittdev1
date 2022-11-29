import React from 'react'
import { Link } from "react-router-dom";

export default function ClockInTimesheetButton() {
  return (
    <div className="clock-timesheet-button">
    <Link to="/viewtimesheet/:1245">
      <button id="clock-timesheet-button-specific" variant="warning">
        View Timesheet
      </button>
    </Link>
  </div>
  )
}
