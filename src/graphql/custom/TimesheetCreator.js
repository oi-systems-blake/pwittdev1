import React from "react";
import { API } from "aws-amplify";
import { createTimeSheet } from "../mutations";
import { graphqlOperation } from "aws-amplify";
import { format } from "date-fns";


export default function TimesheetCreator() {
  let dater = new Date();
  const month = format(dater, "MMMM");
  const year = format(dater, "yyyy");
  const dayNumber = format(dater, "d");
  const dayName = format(dater, "EEEE");
  const actual = format(dater, "PPPP");
  const exactTime = format(dater, "pp");
  const x = 1234
  
  
  const TimerDetails = {
    id: x,
    dayName: dayName,
    dayNumber: dayNumber,
    punches: exactTime,
    month: month,
    year: year,
    date: actual,
    employeeID: x,
  };

  let experiment = {};

  const newTodo = API.graphql(
    graphqlOperation(createTimeSheet, { input: TimerDetails })
  );

  newTodo.then((data) => {
    console.log(data.data.createTimeSheet);
    experiment = data.data.createTimeSheet;

    console.log("tester", experiment)
  });
  return (
    <>
      <div>TimesheetCreator</div>
      <button onClick={() => newTodo}>click me</button>
    </>
  );
}
