import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase'
function Login() {
  
  const signIn = (e) => {
     e.preventDefault()
     
     auth.signInWithPopup(provider)
     .then(result => console.log('result ', result))
     .catch(err => {
           alert(err.message)
       })
  }
  
    return (
    <div className='login'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IMessage_logo.svg/1024px-IMessage_logo.svg.png'
        alt=''
      />
      <Button onClick={signIn} className='login_btn'>Sign In With Google</Button>
    </div>
  );
}

export default Login;
