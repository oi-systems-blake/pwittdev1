import "./EditTSModal.css"
import React from 'react'
import { useState, useEffect } from "react";
import { createTimeSheetEntrys, updateTimeSheet} from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { secure } from "../../../Secret";
import { formatISO, toDate, differenceInSeconds, startOfWeek, format, addSeconds } from 'date-fns'
import { useLocation, useNavigate } from "react-router-dom";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';




export default function EditTSModal({ ...props }) {
  let currentTSSheetID = props.sheetID;
  let currentTSSheetPin = props.pin;
  let editTSSetTrigger = props.setTrigger;
  let currentTSSheetYear = props.sheetyear
  let currentTSSheetMonth = props.sheetmonth
  let currentTSSheetDay = props.sheetday
  let currentTSSheetPunches = props.sheetpunch
  let cleanedPunches = splitPunch(currentTSSheetPunches)
  const navigate = useNavigate();
   let newSum = 0
console.log("year =",currentTSSheetYear, "month =", currentTSSheetMonth, "currentTSSheetDay", currentTSSheetDay)

  let [TSStartValue, setTSStartValue] = useState("10:00")
let [TSEndValue, setTSEndValue] = useState("12:00")


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


function totalHoursForDay(punchesArray) {
  let ins = [];
  let outs = [];
  
  for (var i = 0; i < punchesArray.length; i++) {
    if (i % 2 === 0) {
      // index is even
      ins.push(new Date(punchesArray[i]));
    } else {
      outs.push(new Date(punchesArray[i]));
    }
  }
return sumOfSecondsArrays(ins, outs)
}

function sumOfSecondsArrays(arr1, arr2) {
  let newOne1 = []
  let newSum = 0;
  for (let i = 0; i < arr1.length; i++){
    newOne1.push(differenceInSeconds(new Date(arr2[i]), new Date(arr1[i])))
  newSum = newOne1.reduce((a, b) => a + b, 0)
 console.log(newSum)
  }


  let formattedSum = new Date(newSum * 1000).toISOString().substr(11, 8);
return formattedSum
}

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


function splitPunch(punchesArray){
let newArr = punchesArray.split(",")
return newArr
}


function timeToIso(year, month, day, time){
  let punchFormatted = time.split(":")

let result = formatISO(new Date(year, month, day, punchFormatted[0], punchFormatted[1]))

console.log("did it work?", result)
return result 
}


function VDTSEditRequest(id, punch, hoursTotal,){

  let editedDetails = {
    id: id,
    punch: punch,
    total_hours: hoursTotal
  };
  const editedSheet = API.graphql({
    query: updateTimeSheet,
    variables: { input: editedDetails },
  });
editedSheet.then((x) => {
  console.log(x);
  window.location.reload()
});
}

function TimePickerFormatter(x){
  console.log(x)
  const AEexactStartTime = format(x, "p");
let AEformatStartTime = convertTime12to24(AEexactStartTime)
return AEformatStartTime
}

function etsmSaveButton () {


  const exactStartTime = TimePickerFormatter(TSStartValue);
  const exactEndTime = TimePickerFormatter(TSEndValue);
  
let formatStartTime = convertTime12to24(exactStartTime)
let formatEndTime = convertTime12to24(exactEndTime)

  let newTotal = TSETimeCalculator(formatStartTime, formatEndTime)
console.log(TSStartValue, TSEndValue, newTotal)
let firstPunchFormatted = timeToIso(currentTSSheetYear, currentTSSheetMonth, currentTSSheetDay, formatStartTime)
let lastPunchFormatted = timeToIso(currentTSSheetYear, currentTSSheetMonth, currentTSSheetDay, formatEndTime)
console.log("fp", firstPunchFormatted, "lp", lastPunchFormatted, "nt", newTotal)
console.log("punches", cleanedPunches)
let lastIndex = cleanedPunches.length - 1;
cleanedPunches[0] = firstPunchFormatted
cleanedPunches[lastIndex] = lastPunchFormatted
console.log("new punches", cleanedPunches)
let newTotalHours = totalHoursForDay(cleanedPunches)
console.log(newTotalHours)

VDTSEditRequest(currentTSSheetID, cleanedPunches, newTotalHours)
 }

function etsmExitButton () {
  editTSSetTrigger(false)
}

    return props.trigger ? (
    <div className="ets-modal-background">
    <div className="ets-modal-container">
    <label className="etsm-lab">Start Time:</label>
    <TimePicker
        label="Enter Time"
        value={TSStartValue}
        onChange={(newValue) => {
          setTSStartValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
  <br/>
  <label className="etsm-lab">End Time:</label>
  <TimePicker
        label="Enter Time"
        value={TSEndValue}
        onChange={(newValue) => {
          setTSEndValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />

  <br/>
  <button onClick={()=>etsmSaveButton()} className="etsm-save-button">Save</button>
  <br/>
  <button onClick={etsmExitButton}  className="etsm-exit-button">Exit</button>
  <br/>
  {}
    </div>
  </div>
) : (
  ""
);
}
