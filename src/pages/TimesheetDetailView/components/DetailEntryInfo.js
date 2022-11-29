import React from "react";
import { deleteTimeSheetEntrys } from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default function DetailEntryInfo({ ...props }) {

  let key = props.key;
  let entries = props.entries;
  let entrycallback = props.entrycallback;


  function ConvertTimeToAMPM(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  function deleteTSE(tseID) {
    let deleteTSEDetails = {
      id: tseID,
    };
    const deletedTodo = API.graphql(
      graphqlOperation(deleteTimeSheetEntrys, { input: deleteTSEDetails })
    );
    deletedTodo.then((response) =>{
console.log(response)
window.location.reload()
    })
  }


  function deleteTSEButton(e) {
let currentTSEID = e.currentTarget.attributes.tseid.value
    deleteTSE(currentTSEID)
  }


  return (
    <div  key={key} className="tse-r">
      <div className="tse-val">{entries.projectName}</div>
      <div className="tse-val">{entries.travelerName}</div>
      <div className="tse-val">{ConvertTimeToAMPM(entries.start_time)}</div>
      <div className="tse-val">{ConvertTimeToAMPM(entries.stop_time)}</div>
      <button
      tseid={entries.id}
        onClick={(e) => deleteTSEButton(e)}
        className="delete-button"
      >x</button>
    </div>
  );
}
