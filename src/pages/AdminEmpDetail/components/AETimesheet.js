import React from 'react'

export default function AETimesheet({...props}) {
  let currentSheets = props.aesheets
  console.log(currentSheets)
    
  
  let daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  
  return (
    <div className="timesheet">
    <div className="header-bar">May 1st-6th</div>
    <div className="record">
      <div className="date-box">
        Mon
        <div className="month-day">May 1st</div>
      </div>
      <div className="hours-box">
        7:00AM - 4:00PM
        <div className="daily-total">8h 00m</div>
      </div>
    </div>
    <div className="record">
      <div className="date-box">
        Mon
        <div className="month-day">May 1st</div>
      </div>
      <div className="hours-box">
        7:00AM - 4:00PM
        <div className="daily-total">8h 00m</div>
      </div>
    </div>
    <div className="record">
      <div className="date-box">
        Mon
        <div className="month-day">May 1st</div>
      </div>
      <div className="hours-box">
        7:00AM - 4:00PM
        <div className="daily-total">8h 00m</div>
      </div>
    </div>
    <div className="record">
      <div className="date-box">
        Mon
        <div className="month-day">May 1st</div>
      </div>
      <div className="hours-box">
        7:00AM - 4:00PM
        <div className="daily-total">8h 00m</div>
      </div>
    </div>
    <div className="record">
      <div className="date-box">
        Mon
        <div className="month-day">May 1st</div>
      </div>
      <div className="hours-box">
        7:00AM - 4:00PM
        <div className="daily-total">8h 00m</div>
      </div>
    </div>
    <footer className="footer-bar">
      <div className="sheet-totals">40hrs 0min</div>
    </footer>
  </div>
  )
}
