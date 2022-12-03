import React from 'react'
import { useDispatch } from 'react-redux';
import './Login.scss';
const auth=require('../../redux-files/actions/auth.js');


function Login() {
  const dispatch =useDispatch();

  function performLogin(){
    dispatch(auth.Login())
  }
  return (
    <button className="Login" type="submit" onClick={performLogin}>SIGN IN</button>
  )
}

export default Login