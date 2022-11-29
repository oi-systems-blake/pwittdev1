import React from "react";
import { format, differenceInSeconds } from "date-fns";

export default function DetailSheetInfo({ ...props }) {
  let value = props.value;
  let callback = props.callback;
  function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  function timeSheetLastHour(arry) {
    const lastItem = arry[arry.length - 1];
    return lastItem;
  }

  function makeIsoReadable(preFormatTime) {
    let newTime = format(new Date(preFormatTime), "pp");
    return newTime;
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

  function clockStatusDisplay(status) {
    if (status === false) {
      return "Clocked Out";
    } else {
     return "Clocked In";
    }
  }
  
console.log(value.total_hours)

function renderIfNull(totalHrs){
  if  (totalHrs === null){return "00:00:00"} else {return totalHrs}
}
  return (
    <div>
      <div className="dt-b" id="box 1">
        <h2 className="month">{capitalizeFirstLetter(value.monthName)} </h2>
        <h3 className="day">{ordinal_suffix_of(value.dayNumber)}</h3>
      </div>

      <div className="ts-c" id="bc-1">
        <h3>Timesheet</h3>
        <button onClick={(e) => callback(e)} className="tsdv-eb">Edit</button>
        <div className="tsdv-h">
          <div className="ts-h-lab">Status</div>
          <div className="ts-h-lab">Clock In</div>
          <div className="ts-h-lab">Clock Out</div>
          <div className="ts-h-lab">Total</div>
        </div>
      
      <div className="tsdv-r">
        <div className="ts-val">{clockStatusDisplay(value.clock_status)} </div>
        <div className="ts-val">{makeIsoReadable(value.punch[0])}</div>
        <div className="ts-val">
          {makeIsoReadable(timeSheetLastHour(value.punch))}
        </div>
        <div className="ts-val">{renderIfNull(value.total_hours)}</div>
      </div>
      </div>
     
    </div>
  );
}
