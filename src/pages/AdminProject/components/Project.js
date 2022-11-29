import React from "react";
import { listTimeSheetEntrys } from "../../../graphql/queries";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";


export function Project({ project }){
  let [ProjectSheets, setProjectSheets] = useState([]);


  let ProjId = project.id;

  function ProjHourCalculator() {
    let HRGrabber = API.graphql(
      graphqlOperation(listTimeSheetEntrys, {
        filter: {
          projectID: {
            eq: ProjId,
          },
        },
      })
    );
    HRGrabber.then((x) => {
let entries = x.data.listTimeSheetEntrys.items
setProjectSheets(entries)
    }).then((x) => {
      
    })
  }



  useEffect(() => {
    ProjHourCalculator()
  }, []);



function HourRowDisplay(x){
console.log(x)
  
  return(
    <div className="project-row-hours">hi</div>

  )


}



  return (
    <div className="project-row">
      <div className="project-row-project-name">{project.fields.Project}</div>
      <div className="project-row-right">
        <div className="project-row-status">{project.fields.Status}</div>
       {HourRowDisplay()}
        
      </div>
    </div>
  );
};
