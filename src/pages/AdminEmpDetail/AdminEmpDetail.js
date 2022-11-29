import "./AdminEmpDetails.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { secure } from "../../Secret";
import ProfileCard from "./components/ProfileCard";
import AETimesheet from "./components/AETimesheet";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { listTimeSheets } from "../../graphql/queries";




export function AdminEmpDetail({ ...props }) {

  const navigate = useNavigate();
  const location = useLocation();
  let pin = location.state.targetPin;
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");

  let [timesheetObject, setTimesheetObject] = useState([]);
  let [profileCardObject, setProfileCardObject] = useState([]);
  var [time, setTime] = useState(new Date());

  let awsDate = time.toISOString();
  let AWSStartOfWeek = startOfWeek(new Date(awsDate));
  let AWSEndOfWeek = endOfWeek(new Date(awsDate));
  let SOW = AWSStartOfWeek.toISOString();
  let EOW = AWSEndOfWeek.toISOString();

  let [sheetGrabSOW, setSheetGrabSOW] = useState(SOW);
  let [sheetGrabEOW, setSheetGrabEOW] = useState(EOW);

  function EmpProfileCardGetter(currentPin) {
    let adminEmpProfileGetter = base("Employees")
      .select({
        // Selecting the first 3 records in Brandon's Jobs:
        maxRecords: 10,
        view: "Active Employees",
        filterByFormula: "({pin} = '" + currentPin + "')",
      })
      .all();
    adminEmpProfileGetter.then((x) => {
      setProfileCardObject(x);
    });
  }

  function EmpTimesheetGetter(currentPin) {
    let etsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          AWSDate: {
            between: [sheetGrabSOW, sheetGrabEOW],
          },
          employeeID: {
            contains: currentPin,
          },
        },
      })
    );
    etsGrabber.then((x) => {
      console.log(x);
      let y = x.data.listTimeSheets.items;
      setTimesheetObject(y);
    });
  }

  useEffect(() => {
    EmpProfileCardGetter(pin);
    EmpTimesheetGetter(pin);
  }, [sheetGrabSOW]);

  function aeinfoCallback(e) {
    console.log(e);
  }

  let daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  function AESheetSelected(e) {
    console.log("hi", e);
    let sheetData = e.currentTarget.attributes.sheetdatenumber.value;
   let sheetID = e.currentTarget.attributes.sheetawsid.value;
    let sheetmonth = e.currentTarget.attributes.sheetmonthnumber.value
    let sheetday = e.currentTarget.attributes.sheetdaynumber.value
    let sheetyear = e.currentTarget.attributes.sheetyearnumber.value
    let sheetpunches = e.currentTarget.attributes.sheetpunch.value 
    navigate("/viewdetailedts", { state: {sheetpunches, sheetyear, sheetmonth, sheetday, sheetID, sheetData, pin } });
  }

  function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  function ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  function makeIsoReadable(preFormatTime) {
    let newTime = format(new Date(preFormatTime), "pp");
    return newTime;
  }

  function timeSheetLastHour(arry) {
    const lastItem = arry[arry.length - 1];
    return lastItem;
  } 

  function filterSheets(sheets, daysOfWeek) {
    console.log(sheets);
    let result = sheets.filter((sheet) => sheet.dayName === daysOfWeek);
    if (result.length > 0) {
      return (
        <div 
        role="button"
        onClick={(event) => AESheetSelected(event)}
        className="record"
        sheetdatenumber={result[0].dateNumber}
        sheetawsid={result[0].id}
        sheetmonthnumber={result[0].monthNumber}
        sheetyearnumber={result[0].year}
        sheetdaynumber={result[0].dayNumber}
        sheetpunch={result[0].punch}
        >
          <div className="date-box">
            {capitalizeFirstLetter(result[0].dayName)}
            <div className="month-day">
              {capitalizeFirstLetter(result[0].monthName)}{" "}
              {ordinal_suffix_of(result[0].dayNumber)}
            </div>
          </div>

          <div className="hours-box">
            {/* result[0].punch.map((x) => {
              let formattedPuncher = makeIsoReadable(x);
              console.log(formattedPuncher);
              return <div onClick={(event) => AESheetSelected(event)}>{formattedPuncher}</div>;
            })*/} 
            {makeIsoReadable(result[0].punch[0])} -{" "}
            {makeIsoReadable(timeSheetLastHour(result[0].punch))}
            <div className="daily-total">{result[0].total_hours}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="record">
          <div className="date-box">
            {capitalizeFirstLetter(daysOfWeek)}
            <div className="month-day">month day</div>
          </div>
          <div className="hours-box">
            00AM - 00PM
            <div className="daily-total">00m</div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="emp-detail-page">
      <div className="page-container">
        {Object.values(profileCardObject).map((info, index) => (
          <ProfileCard
            key={index}
            aeinfo={info}
            aeentrycallback={aeinfoCallback}
          />
        ))}
        <div className="timesheet">
          <div className="header-bar">May 1st-6th</div>

          {daysOfWeek.map((days) => filterSheets(timesheetObject, days))}
          <footer className="footer-bar">
            <div className="sheet-totals">40hrs 0min</div>
          </footer>
        </div>
      </div>
    </div>
  );
}