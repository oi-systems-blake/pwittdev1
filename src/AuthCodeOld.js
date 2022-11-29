/* // login.js

import Logo from '../resources/pwi-logo.jpg'
import { Image } from '@aws-amplify/ui-react';
import { View } from '@aws-amplify/ui-react';
import { useTheme } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';


const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src={Logo}
        />
      </View>
    );
  },
}



export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
    useEffect(() => {
      if (route === 'authenticated') {
        navigate(from, { replace: true });
      }
    }, [route, navigate, from]);
    return (
      <Authenticator components={components}>
  
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    );
  }

// app.js

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

//// clockin

const navigate = useNavigate();

const { signOut, authStatus } = useAuthenticator((context) => [context.user]);


function logOut() {
  signOut();
  navigate("/");
}
console.log(authStatus);

// admin nav bar
const {signOut, authStatus} = useAuthenticator((context) => [context.user]);
const navigate = useNavigate();
function logOut() {
    signOut();
    navigate('/');
  }


 */