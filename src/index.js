import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Routing } from "./routing/Routing"
import { Amplify } from 'aws-amplify';
import { ClockIn } from './pages/ClockInPage/ClockIn';
import { ViewTimesheet } from './pages/ViewTimesheet/ViewTimesheet';
import { AdminEmp } from './pages/AdminEmp/AdminEmp';
import { AdminProject } from './pages/AdminProject/AdminProject';
import TestClock from "./routing/TestClock"
import TimeTest from './routing/TimeTest';
import { TestComp } from "./pages/ClockInPage/TestComp"
import awsExports from './aws-exports';
import { BjTest } from './BjTest';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
Amplify.configure(awsExports);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
  <React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDateFns}>
  <Routing/>
    </LocalizationProvider>
  </React.StrictMode>
  </>
);