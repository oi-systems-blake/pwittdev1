import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./ViewTimesheet.style.css";
import { useLocation } from "react-router-dom";
import { startOfWeek } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { listTimeSheets } from "../../graphql/queries";
import { format } from "date-fns";

export function TsTimeSheetGrab() {

  var [time, setTime] = useState(new Date());
  let [timeSheets, setTimeSheets] = useState([]);

  let actualDate = format(time, "yyyyMMdd");
  let actualDateNumber = parseFloat(actualDate, 10);
  let startOfWeekAsString = format(startOfWeek(time), "yyyyMMdd");
  let actualStartOfWeek = parseFloat(startOfWeekAsString, 10);

  useEffect(() => {
    setTime(new Date());
  }, []);
  function TimeSheetGrab() {
    let tsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          employeeID: {
            contains: "1234",
          },
        },
      })
    );
    tsGrabber.then((x) => {
      console.log(x)
      let y = x.data.listTimeSheets.items
      setTimeSheets(y);
    });
  }

  return (
    <div>
      <div>TsTimeSheetGrab</div>
      <button className="testingbutton" onClick={() => TimeSheetGrab()}>click me</button>
      <div>
      {Object.keys(timeSheets).map((key, index) => {
        return (
          <div key={index}>
            <h2>
              {key}
            </h2>

            <hr />
          </div>
        );
      })}



      {Object.values(timeSheets).map((value, index) => {
        return (
          <div key={index}>
            <h2>{value.dayNumber}</h2>

        
          </div>
        );
      })}
    </div>
      </div>

  );
}

