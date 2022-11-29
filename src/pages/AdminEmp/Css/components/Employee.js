import React from "react";
import { useState, useEffect } from "react";
import { listTimeSheets } from "../../../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { startOfWeek, endOfWeek } from "date-fns";

export default function Employee({ ...props }) {
  let emp = props.emp;
  let AECallback = props.callback;
  let pin = emp.fields.pin;

  var [time, setTime] = useState(new Date());
  let [AETimeSheets, setAETimeSheets] = useState([]);

  let awsDate = time.toISOString();
  let AWSStartOfWeek = startOfWeek(new Date(awsDate));
  let AWSEndOfWeek = endOfWeek(new Date(awsDate));
  let SOW = AWSStartOfWeek.toISOString();
  let EOW = AWSEndOfWeek.toISOString();

  let [sheetGrabSOW, setSheetGrabSOW] = useState(SOW);
  let [sheetGrabEOW, setSheetGrabEOW] = useState(EOW);
  let [AEEmpTotalHours, setAEEmpTotalHours] = useState("N/A");
  let [AEEmpClockStatus, setAEEmpClockStatus] = useState(false);

let emptyTotalHourArr = []
let emptyTotalHour = 0;


  useEffect(() => {
    AETsTimeSheetGrab();
  }, [sheetGrabSOW]);

  function WeeklyHourTotal(dayHours) {
    console.log(dayHours)
 if (dayHours.length% 2 == 0){

 let splitHours = dayHours.map((x) => {
   
  let a = x.split(":");
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    
       return seconds;
    });
    emptyTotalHour = splitHours.reduce((a, b) => a + b, 0)
    console.log(emptyTotalHour)
     let formattedSum = new Date(emptyTotalHour * 1000).toISOString().substr(11, 8);
    return formattedSum} else {
let newDayHours = dayHours.slice(-1)

let splitHours = newDayHours.map((x) => {
   
  let a = x.split(":");
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    
       return seconds;
    });
    emptyTotalHour = splitHours.reduce((a, b) => a + b, 0)
    console.log(emptyTotalHour)
     let formattedSum = new Date(emptyTotalHour * 1000).toISOString().substr(11, 8);
    return formattedSum

    }
  }

  function lastTSForAEFinder() {
    console.log(AETimeSheets);
    if (AETimeSheets === undefined || AETimeSheets === []) {
      console.log("empty");
    } else {
      console.log("not empty");
    }
  }

  function AETsTimeSheetGrab() {
    let AEtsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          AWSDate: {
            between: [sheetGrabSOW, sheetGrabEOW],
          },
          employeeID: {
            contains: pin,
          },
        },
      })
    );
    //     AEtsGrabber.then((x) => {
    //       console.log(":starthere", x.data.listTimeSheets.items);
    //       let amountOfSheets = x.data.listTimeSheets.items;

    //       if (amountOfSheets.length < 1) {
    //         console.log(pin);
    //       } else {
    //         let AESTatus = x.data.listTimeSheets.items[0].clock_status
    //         console.log(AESTatus);
    // if (AESTatus === false){
    //   return "Clocked Out"
    // }
    // else {
    //   return "Clocked In"
    // }

    //       }
    //     });
    AEtsGrabber.then((x) => {
      if (x.data.listTimeSheets.items.length > 0) {
        if (x.data.listTimeSheets.items[0].clock_status === false) {
          setAEEmpClockStatus(false);
          console.log("sheets present");
        } else if (x.data.listTimeSheets.items[0].clock_status === true) {
          setAEEmpClockStatus(true);
        }
        let newObject = x.data.listTimeSheets.items
        Object.values(newObject).map((x) => {
         emptyTotalHourArr.push(x.total_hours)
       let AEDisplayWHT = WeeklyHourTotal(emptyTotalHourArr)
          console.log(x.total_hours)
          setAEEmpTotalHours(AEDisplayWHT)
        })
       

      } else {
        console.log("no sheets");
      }
    });
    AEtsGrabber.then((x) => {});
  }

  function clockStatusDisplay(status) {
    if (status === false) {
      return "Clocked Out";
    } else {
      return "Clocked In";
    }
  }

  return (
    <div
      onClick={(event) => AECallback(event)}
      emp={emp}
      pin={emp.fields.pin}
      className="emp-box-r"
    >
      <div className="emp-box-r-l">{emp.fields["Full Name"]} </div>
      <div className="emp-box-r-l">{clockStatusDisplay(AEEmpClockStatus)}</div>
      <div className="emp-box-r-l">{AEEmpTotalHours}</div>
    </div>
  );
}
