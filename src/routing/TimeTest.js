import React from "react";
import { format } from "date-fns";
import { listTimeSheets } from "../graphql/queries";
import { createTimeSheet } from "../graphql/mutations";
import { API } from "aws-amplify";
import { graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { secure } from "../Secret";
import ClockInModal from "../pages/ClockInPage/Modals/ClockInModal";
import ErrorModal from "../pages/ClockInPage/Modals/ErrorModal";

export default function TimeTest() {
  let [pin, setPin] = useState("");
  let [errorTrigger, setErrorTrigger] = useState(false);
  let [sideTrigger, setSideTrigger] = useState(false);
  let [employees, setEmployees] = useState("");
  let [successTrigger, setSuccessTrigger] = useState(false);

  let Airtable = require("airtable");
  let base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");
  let airTableApiEmployeeTable = base("Employees");

  const handlePinInputChange = (event) => {
    setPin(event.target.value);
  };

  function triggerStatement(modal) {
    modal(true);
    setTimeout(() => {
      modal(false);
    }, 2500);
    setPin("");
    setEmployees("");
  }

  let dater = new Date();
  const month = format(dater, "MMMM");
  const year = format(dater, "yyyy");
  const dayNumber = format(dater, "d");
  const dayName = format(dater, "EEEE");
  const actualDate = format(dater, "PPPP");
  const exactTime = format(dater, "pp");

  function EmpCheck() {
    const records = airTableApiEmployeeTable
      .select({
        view: "All",
        filterByFormula: "({pin} = '" + pin + "')",
      })
      .all();
    records
      .then((value) => {
        console.log(value);
        console.log(value.length);
        if (value.length === 0) {
          console.log("employee not found");
          setEmployees("");
          return "";
        } else {
          console.log("we found an employee sir");
          setEmployees(value[0].fields["Preferred Name"]);
          return value;
        }
      })
      .then((x) => {
        if (x === "") {
          console.log("no employee here sir");
          setEmployees("");
        } else {
          console.log("employee found and working");
          TimeSheetCheck();
        }
      });
  }

  function TimeSheetCheck() {
    let checker = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          date: {
            contains: actualDate,
          },
          employeeID: {
            contains: pin,
          },
        },
      })
    );
    checker.then((x) => {
      let sheetLength = x.data.listTimeSheets.items.length;

      if (sheetLength === 0) {
        console.log("no timesheets please create one");
        TimeSheetCreate()
      } else if (sheetLength === 1) {
        let sheetStatus = x.data.listTimeSheets.items[0].clock_status;
        let sheetPunches = x.data.listTimeSheets.items[0].punches;
        console.log("1 timesheet please add a punch");
        console.log("status is", sheetStatus, "pucnhes are", sheetPunches);
      }
    });
  }
 function TimeSheetCreate() {
  const TimerDetails = {
    dayName: dayName,
    dayNumber: dayNumber,
    punches: exactTime,
    month: month,
    clock_status: true,
    year: year,
    date: actualDate,
    employeeID: pin,
  };
  const newTimeSheet = API.graphql(graphqlOperation(createTimeSheet, {input: TimerDetails}));
newTimeSheet.then((x) => {console.log(x)})
}







  async function Stamp() {
    if ((pin + "").length > 4 || (pin + "").length < 4) {
      return triggerStatement(setErrorTrigger);
    }
    EmpCheck();
  }

  return (
    <>
      <div className="clock page">
        <div className="clock-container">
          <div className="clock-clock-input">
            {/* <h1>{arrayLength}</h1> */}
            <input
              id="clock-clock-input-specific"
              type="text"
              placeholder="Enter 4 Digit Pin"
              onChange={handlePinInputChange}
              value={pin}
            ></input>
          </div>
          <div className="clock-clock-button">
            {employees}
            <button
              className="clock special-button"
              variant="warning"
              onClick={Stamp}
            >
              Clock In/Out
            </button>
          </div>

          <ClockInModal
            name={employees}
            trigger={successTrigger}
            setTrigger={setSuccessTrigger}
          />
          <ErrorModal trigger={errorTrigger} setTrigger={setErrorTrigger} />

          {/* <TimesheetCreator /> */}
          {/*  <TimeTest /> */}
        </div>
      </div>
    </>
  );
}
