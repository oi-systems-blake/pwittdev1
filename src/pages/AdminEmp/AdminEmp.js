import "./Css/AdminEmp.style.css";
import { secure } from "../../Secret";
import Employee from "./Css/components/Employee";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export function AdminEmp() {
  let navigate = useNavigate();

  let [airtableEmps, setAirtableEmps] = useState([]);
  let [airtableDisplayEmps, setAirtableDisplayEmps] = useState([]);
  let [airtableEmpsSearch, setAirtableEmpsSearch] = useState("");
  let [adminEmpPin, setAdminEmpPin] = useState("");
  let [selectedEmpData, setSelectedEmpData] = useState([]);

  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");

  useEffect(() => {
    console.log();
    let AdminEmpLoad = base("Employees")
      .select({
        // Selecting the first 3 records in Brandon's Jobs:
        maxRecords: 100000,
        view: "Active Employees",
      })
      .all();
    AdminEmpLoad.then((x) => {
      setAirtableEmps(x);
      setAirtableDisplayEmps(x);
    });
  }, []);

  function handleAirtableEmpsSearchChange(event) {
    setAirtableEmpsSearch(event.target.value);
    let result = airtableEmps.filter((emp) => {
      return (emp.fields["Preferred Name"] + emp.fields.Mobile)
        .toLowerCase()
        .includes(airtableEmpsSearch);
    });
    setAirtableDisplayEmps(result);
  }

  function navigateToAEDV() {
    navigate("/admin/employeedetails", { state: { adminEmpPin } });
  }

  function AdminEmpPinSetter(actualPin){
 setAdminEmpPin(actualPin);
    
  }

 async function AdminEmpCallback(e) {
  let targetPin = e.currentTarget.attributes.pin.value;
 navigate("/admin/employeedetails", { state: { targetPin } })
  }

  return (
    <div className="emp-page">
      <div className="emp-container">
        <input
          //  value={projectSearch}
          className="search-projects"
          onChange={handleAirtableEmpsSearchChange}
        ></input>
        <div className="emp-box-t">
          <div className="emp-row-header-label">Name</div>
          <div className="emp-row-header-label">Phone</div>
          <div className="emp-row-header-label">Email</div>
        </div>

        {airtableDisplayEmps.map((emp) => (
          <Employee callback={AdminEmpCallback} key={emp.id} emp={emp} />
        ))}
      </div>
    </div>
  );
}
