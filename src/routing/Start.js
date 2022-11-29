import React, { useState, useEffect } from 'react'
import { Button } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify'

//import '@aws-amplify/ui-react/styles.css';



function Start() {
  useEffect(() => {
    checkUser()
  }, [])
  const [user, setUser] = useState({}) 
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes, }
      setUser(userInfo)
    } catch (err) { console.log('error: ', err) }
  }
  function signOut() {
    Auth.signOut()
      .catch(err => console.log('error signing out: ', err))
  }
  return (
    <div>
      <h1>Profile</h1>
      <h2>Username: {user.username}</h2>
      <h3>Email: {user.email}</h3>
      <h4>Phone: {user.phone_number}</h4>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

//export default withAuthenticator(Start)