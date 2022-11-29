import React from "react";
import Airtable, { Table } from "airtable";
import { useState, useEffect } from "react";
import { secure } from "../Secret";
import { getEmployee } from "../graphql/queries";
import Amplify, { API, graphqlOperation } from "aws-amplify";

export default function Fetch({ callback, pin }) {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");
  let table = base("Employees");

  const [employees, setEmployees] = useState([]);
  const [emps, setEmps] = useState([]);
  const [ampEmps, setAmpEmps] = useState([]);

  const fetchEmployees = async (x) => {
    try {
      const empData = await API.graphql(
        graphqlOperation(getEmployee, { id: x })
      );
      const empList = empData.data.getEmployee;
      console.log("employee list", empList);
      setAmpEmps(empList);
    } catch (error) {
      console.log("error on Fetching Emps", error);
    }
  };
  useEffect(() => {
    console.log( fetchEmployees(pin));

    if ((pin + "").length < 4) {
      return;
    }
    base("Employees")
      .select({
        view: "Active Employees",
        filterByFormula: "({pin} = '" + pin + "')",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            console.log("Retrieved", record.get("Preferred Name"));
          });
          console.log("does this have the pin:", pin);
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
          console.log(records);
          setEmployees(records);
          callback(employees);
          console.log("did this work" + employees);
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, [pin]);
  return <div>Fetch</div>;
}
