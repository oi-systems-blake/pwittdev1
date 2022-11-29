
import logo from "../resources/pwi-logo.png"
import "./CustomNavBar.css"
import { Outlet } from "react-router-dom";
import { AdminEmp } from "../pages/AdminEmp/AdminEmp"
import { Link } from 'react-router-dom';



export function AdminNavBar() {
    


    return (
        <>
        <div className="adminNav">
        <div className="navbar-container">
          <div className="navbar-img" id='image'>
            <img
              src={logo}
              width="75"
              height="50"
              className="d-inline-block align-top"
              alt="pwi logo"
            />
            </div>
            <ul className='path-container'>
          <li className="list"><a className="ancor" href="/admin/employee">Employees</a></li>
          <li className="list"><a className="ancor" href="/admin/projects">Projects</a></li>
          <li className="list"><a className="ancor" href="/admin/timesheet">Timesheets</a></li>
          </ul>
          <div className='button-container'>
          <button className="sing-out" onClick={console.log("fix me please")}>Sign Out</button>
          </div>
          
        </div>
      </div>
      <Outlet/>
        </>
    );
}

