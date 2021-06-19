import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice.js';
import './App.css';
import IMessage from './components/IMessage';
import Login from './components/Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log('authUser ', authUser)
        dispatch(
          login({
            uid: authUser.uid,
            username: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  console.log('User app', user);

  return (
    <div className='app'>
      {/* <Login /> */}
      {user ? <IMessage /> : <Login /> }
    </div>
  );
}

export default App;
