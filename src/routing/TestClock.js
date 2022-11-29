import React from "react";

import TimeTest from "./TimeTest"
import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

export default function TestClock() {
  
  const [pin, setPin] = useState("");
  const eventDetails = {
    id: "6969",
    month: "May",
    year: "2022",
    dayNumber: 5,
    dayName: "mon",
    employeeID: "1234",
    projectsID: "6868",
  };

  const handleChange = (event) => {
    setPin(event.target.value);
    console.log("pin is", pin);
  };
  const callThisFromChild = (pin) => {
    console.log("child passed in", pin);
    return pin;
  };

  async function TimeStamp() {
    const createTimeSheet = /* GraphQL */ `
  mutation CreateTimeSheet(
    $input: CreateTimeSheetInput!
    $condition: ModelTimeSheetConditionInput
  ) {
    createTimeSheet(input: $input, condition: $condition) {
      id
      month
      year
      dayNumber
      dayName
      hours
      total_hours_day
      employeeID
      projectsID
      createdAt
      updatedAt
    }
  }
`;
    
    
    
  



    const newProj = await API.graphql(
      graphqlOperation(createTimeSheet, { input: eventDetails })
    );
    console.log(newProj);
  }

  return (
    <>

      <div>
        <TimeTest/>
{/*     <Fetch pin={pin} callback={callThisFromChild} />
    <button onClick={TimeStamp}>clock in</button> 
        <input type="text" value={pin} onChange={handleChange}></input>

        <h1>{pin}</h1>*/}
      </div>
    </>
  );
}
