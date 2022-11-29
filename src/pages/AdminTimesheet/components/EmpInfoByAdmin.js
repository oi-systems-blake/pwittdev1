import React, { useEffect } from "react";

export default function EmpInfoByAdmin({ ...props }) {
  let timer = props.timers;
let arr = ""
let arr1 = ""
let arr2 = ""
  try {
     arr = timer.punches[0].split(",");
    arr1 = arr[0].replace(/[[\]]/g, "");
     arr2 = arr[1].replace(/[[\]]/g, "");
    console.log(arr1, arr2);
  } catch {}
  return (
    <div className="tsr">
      <div className="row-label">
        {timer.monthNumber}/{timer.dayNumber}/{timer.year}
      </div>
      <div className="row-label">{arr1}</div>
      <div className="row-label">{arr2}</div>
      <div className="row-label">{timer.monthNumber}</div>
      <div className="row-label">{timer.dayNumber}</div>
    </div>
  );
}
