import React, { useState } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { logMeIn, setEmail, setPassword } from '../../redux/loginSlice';
import { Redirect } from '../../Components/Redirect';

const Login = () => {
  const userData = useAppSelector(state => state.user.data)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const [isRedirect, setRedirect] = useState(false)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logMeIn())
    setRedirect(true)
  }

  return isRedirect ? (<Redirect to='/' />) : (
    <div className="loginContainer">
      <p>FAFA {userData.email}</p>
      <form onSubmit={(e) => { submitHandler(e) }}>
        <label>Enter your email:<br />
          <input
            type="text"
            name="email"
            onChange={(e) => {
              dispatch(setEmail(e.target.value))
            }}

          />
        </label>
        <br />
        <label>Enter your pass:<br />
          <input
            type="password"
            name="password"
            onChange={(e) => {
              dispatch(setPassword(e.target.value))
            }}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
  );

}

export default Login;
