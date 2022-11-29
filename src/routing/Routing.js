import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { ClockIn } from "../pages/ClockInPage/ClockIn"
import {App} from "./App"
import {ViewTimesheet} from "../pages/ViewTimesheet/ViewTimesheet";
import { AdminEmp } from "../pages/AdminEmp/AdminEmp"
import {AdminEmpDetail} from "../pages/AdminEmpDetail/AdminEmpDetail"
import TimesheetDetailView from "../pages/TimesheetDetailView/TimesheetDetailView"
import { AdminProject } from "../pages/AdminProject/AdminProject";
import { AdminTimesheet } from "../pages/AdminTimesheet/AdminTimesheet";
import { AdminNavBar } from "../adminNavBar/AdminNavBar";



export function Routing() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ClockIn />} />
    <Route path="/viewtimesheet" element={<ViewTimesheet  />} />
    <Route path="/viewdetailedts" element={<TimesheetDetailView />} />
    <Route path="admin" element={<AdminNavBar />}>
    <Route path="employee" element={<AdminEmp/>}/>
    <Route path='employeedetails' element={<AdminEmpDetail/>}/>
    <Route path='projects' element={<AdminProject />}/>
    <Route path='timesheet' element={<AdminTimesheet />}/>
     </Route>
      </Routes>
    </BrowserRouter>
  );
}

