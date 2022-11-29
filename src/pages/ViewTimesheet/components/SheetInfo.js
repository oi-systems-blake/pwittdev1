import React from "react";
import { format, differenceInSeconds } from "date-fns";

export default function SheetInfo({ ...props }) {
  let value = props.value;
  let callback = props.callback;

  function sheetSelected(event) {
    let sheetData = event.currentTarget.attributes.propy.value
    console.log(event)
    callback(sheetData);
  }

  function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  function makeIsoReadable(preFormatTime) {
    let newTime = format(new Date(preFormatTime), "pp");
    return newTime;
  }

  function timeSheetLastHour(arry) {
    const lastItem = arry[arry.length - 1];
    return lastItem;
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

  function renderIfNull(totalHrs){
    if  (totalHrs === null){return "00:00:00"} else {return totalHrs}
  }

function newButtonFunction(e){
console.log(e.currentTarget.attributes.propy.value)
console.log(e.target.attributes)
}

  return (
    <div role="button" onClick={(event) => sheetSelected(event)} propy={value.dateNumber} className="ts-r">
      <div className="left-b">
        {capitalizeFirstLetter(value.dayName)}
        <div className="mm-dd">
          {capitalizeFirstLetter(value.monthName)} {ordinal_suffix_of(value.dayNumber)}
        </div>
      </div>
      <div className="right-b">
        {makeIsoReadable(value.punch[0])} -{" "}
        {makeIsoReadable(timeSheetLastHour(value.punch))}
        <div className="hh-mm">{renderIfNull(value.total_hours)}</div>
        
        </div>

    </div>
  );
}
