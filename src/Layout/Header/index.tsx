import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { logMeOut } from "../../redux/logoutSlice";
import { setRedirectNeeded } from "../../redux/redirectSlice";
import { RootState } from "../../redux/store";
import { getLoginTime } from "../../redux/userSlice";
import "./index.scss";

const Header = () => {
  const logInOutToggle = {
    "Login": "Logout",
    "Logout": "Login"
  }
  const userData = useAppSelector(state => state.user.data)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const [loginInterval, setLoginInterval] = useState(setInterval(() => { }, 0));

  const [remaingLoginTimeBy10Seconds, setRemaingLoginTimeBy10Seconds] = useState(0);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [links] = useState(new Map<string, string>([
    ["/", "Home"], ["/myDailyCourses", "My daily courses"],
    ["/about", "About"], ["/login", "Login"],
    ["/logout", "Logout"], ["/register", "Register"], ["/test", "Test"],
  ]));

  const loginOrLogout = () => {
    return userData.nickname === "" ? "Login" : "Logout"
  }

  useEffect(() => {
    if (userData.nickname !== "") {
      const tmpInterval = setInterval(() => {
        dispatch(getLoginTime())
      }, 1000);
      setLoginInterval(tmpInterval)
    }
  }, [dispatch, userData.nickname]);

  useEffect(() => {
    if (userData.remaingLoginTime < 0) {
      clearInterval(loginInterval);
      dispatch(setRedirectNeeded(true))
      dispatch(logMeOut())
    }
  }, [dispatch, userData.remaingLoginTime, loginInterval]);

  useEffect(() => {
    if (userData.remaingLoginTime % 10 === 0) {
      setRemaingLoginTimeBy10Seconds(userData.remaingLoginTime)
    }
    if (remaingLoginTimeBy10Seconds === 0) {
      setRemaingLoginTimeBy10Seconds(userData.remaingLoginTime)
    }
  }, [userData.remaingLoginTime]);

  const padTime = (time: number) => {
    return time.toString().padStart(2, '0')
  }
  const prettyDate = (seconds: number) => {
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${days}d - ${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`
    // let kek = `${days}d - ${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`
    // console.log(kek);
    // return kek
  }

  return (
    <nav className="header">
      <div className="headerInfoBar">
        <p> Ch Diary ={">"} {userData.nickname} </p>
        <p className="remainingSessionTime">{userData.remaingLoginTime > 0 ? prettyDate(remaingLoginTimeBy10Seconds) : null}</p>
      </div>
      <button className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "header-menu expanded" : "header-menu"
        }
      >
        <ul>
          {
            [...links.entries()]
              .filter(([, value]) => value !== logInOutToggle[loginOrLogout()])
              .map(([key, value], index) =>
                <li key={index} >
                  <Link to={key} onClick={() => { setIsNavExpanded(false) }} >{value}</Link>
                </li>
              )
          }
        </ul>
      </div>
    </nav>
  );
}

export default Header
