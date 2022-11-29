import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Login } from "./Login"
import { ClockIn } from "../pages/ClockInPage/ClockIn"




export function App() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  console.log(authStatus)

  return (
    <>
    {authStatus === 'configuring' && 'Loading...'}
    {authStatus !== 'authenticated' ? <Login /> : <ClockIn />}
    </>
  );
}
