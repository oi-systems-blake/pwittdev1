import React from "react";
import "./AddEntryModal.css"
import { useState, useEffect } from "react";
import { createTimeSheetEntrys } from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { secure } from "../../../Secret";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { formatISO, toDate, differenceInSeconds, startOfWeek, format, addSeconds } from 'date-fns'


export default function AddEntryModal({ ...props }) {
  let currentSheetID = props.sheetID;
  let currentSheetPin = props.pin;
  let ADMSetTrigger = props.setTrigger;

  let [startValue, setStartValue] = useState(new Date());
  let [endValue, setEndValue] = useState(new Date());
  let [travelerID, setTravelerID] = useState("");
  let [travelerName, setTravelerName] = useState("")
  let [tseProjectName, setTSEProjectName] = useState("")
  let [tseProjectID, setTSEProjectID] = useState("")

  const [openProjectDropDown, setOpenProjectDropDown] = useState(false);
  let [entryProjects, setEntryProjects] = useState([]);
  let [entryProjectSearch, setEntryProjectSearch] = useState("");
  let [entryDisplayProjects, setEntryDisplayProjects] = useState([]);
  let [entryTravelers, setEntryTravelers] = useState([]);

  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appdxUzxbQJdbR8fz");

  useEffect(() => {
    console.log();
    let runit = base("Projects")
      .select({
        maxRecords: 10000,
        view: "inprogress",
      })
      .all();
    runit.then((project) => {
      console.log("hey", project);
      setEntryProjects(project);
      setEntryDisplayProjects(project);
    });
  }, []);

  const handleDropDownOpen = () => {
    setOpenProjectDropDown(!openProjectDropDown);
  };

  function hmsToSecondsOnly(str) {
    var p = str.split(":"),
      s = 0,
      m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }

    return s;
  }

  function TSETimeCalculator(startTime, endTime) {
    let startTimeInSeconds = hmsToSecondsOnly(startTime);
    let endTimeInSeconds = hmsToSecondsOnly(endTime);
    let tseAllotedTime = endTimeInSeconds - startTimeInSeconds;
    let formattedAllotedTime = new Date(tseAllotedTime * 60 * 1000)
      .toISOString()
      .substr(11, 8);
    let finalResult = formattedAllotedTime.slice(0, -3);
    return finalResult;
  }

  function addTSE(x,y) {
    let AH = TSETimeCalculator(x, y);

    const tseDetails = {
      start_time: x,
      stop_time: y,
      allocated_hours: AH,
      EmployeeID: currentSheetPin,
      travelersID: travelerID,
      travelerName: travelerName,
      timesheetID: currentSheetID,
      projectName: tseProjectName,
      projectID: tseProjectID,
      untitledfield: startValue

    };
    const newTimeSheetEntry = API.graphql(
      graphqlOperation(createTimeSheetEntrys, { input: tseDetails })
    );
    newTimeSheetEntry.then((x) => {
      console.log(x);
      ADMSetTrigger(false);
      window.location.reload()
    });
  }

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }

function TimePickerFormatter(x){
  console.log(x)
  const AEexactStartTime = format(x, "p");
let AEformatStartTime = convertTime12to24(AEexactStartTime)
return AEformatStartTime
}

  
  function handleSubmit(event) {
    // 👇️ prevent page refresh
    event.preventDefault();
    console.log("form submitted ✅");
    addTSE(TimePickerFormatter(startValue),TimePickerFormatter(endValue));
  }



  function handleProjectSearchChange(event) {
    setEntryProjectSearch(event.target.value);
    let result = entryProjects.filter((project) => {
      return (project.fields["Project ID (auto)"] + project.fields.Project)
        .toLowerCase()
        .includes(entryProjectSearch);
    });
    setEntryDisplayProjects(result);
  }




  function FindTravByProj(e) {
    let SelectedProjId = e.currentTarget.attributes.selectedproj.value;
    let SelectedProjName = e.currentTarget.attributes.name.value;
    setTSEProjectName(SelectedProjName);
    setTSEProjectID(SelectedProjId)
    let TravFinder = base("Travelers")
      .select({
        maxRecords: 10000,
        view: "inprogress",
        filterByFormula: "({prid} = '" + SelectedProjId + "')",
      })
      .all();
    TravFinder.then((value) => setEntryTravelers(value));
  }

function FoundTraveler(e){
let SelectedTravelerId = e.currentTarget.attributes.selectedtrav.value;
let SelectedTravelerName = e.currentTarget.attributes.name.value;
setTravelerID(SelectedTravelerId)
setTravelerName(SelectedTravelerName)
setOpenProjectDropDown(false)
}

  function ATSEDropDown(projectState, travelerState) {
    if (travelerState.length === 0) {
      console.log(projectState);
      return projectState.map((displayProject) => {
        return (
          <li
            onClick={(event) => FindTravByProj(event)}
            selectedproj={displayProject.id}
            key={displayProject.id}
            project={displayProject}
            name={displayProject.fields["Project"]}
          >
            {displayProject.fields["Project"]}
          </li>
        );
      });
    } else {
      return travelerState.map((displayTraveler) => {
        return (
          <li
            onClick={(event) => FoundTraveler(event)}
            selectedtrav={displayTraveler.id}
            key={displayTraveler.id}
            traveler={displayTraveler}
            name={displayTraveler.fields["Name"]}
          >
            {displayTraveler.fields["Name"]}
          </li>
        );
      });

    }
  }

  return props.trigger ? (
    <div className="atse-modal-background">
      <div className="atse-modal-container">
        <h3 className="tdv-aem-header">Add Time Sheet Entry</h3>
        
        <br/>
        
        <div id="tp-start">
         <TimePicker
        label="Start Time"
        value={startValue}
        onChange={(newValue) => {
          setStartValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
        </div>
        <br/>
        <div id="tp-end">
        <TimePicker
        label="End Time"
        value={endValue}
        onChange={(newValue) => {
          setEndValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
        </div>
        
        {travelerName}
        <div className="entry-total-cont">
        <div className="entry-total">
        { TSETimeCalculator(TimePickerFormatter(startValue), TimePickerFormatter(endValue)) }
        </div>
        </div>
        
        <br/>
        
          <button className="drop-down" onClick={handleDropDownOpen}>Dropdown</button>
          
         
          {openProjectDropDown ? (
            <><input className="aem-search-projects"
            onChange={handleProjectSearchChange}>
          </input><ul className="menu">
              {ATSEDropDown(entryDisplayProjects, entryTravelers)}
            </ul></>
          ) : null}
        

        {/*           <label>
            Traveler ID:
            <input
              type="text"
              value={travelerID}
              onChange={(e) => setTravelerID(e.target.value)}
            />
          </label> */}
          <br/>
        <button className="sub-btn" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
    </div>
  ) : (
    ""
  );
}
