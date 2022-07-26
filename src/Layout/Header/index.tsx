import { useState } from "react";
import { connect } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import { Dispatch } from "redux";
import { RootState } from '../../redux/store';
import { UserData } from '../../types';
import "./index.scss";

interface HeaderProps {
  dispatch: Dispatch;
  user: UserData;
}

const Header = ({ user }: HeaderProps) => {

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [links, setLinks] = useState(new Map<string, string>([
    ["/", "Home"], ["/today", "Today"], ["/about", "About"], ["/login", "Login"],
    ["/register", "Register"], ["/test", "Test"],
  ]));


  return (
      <nav className="header">
        <a href="/" className="brand-name">
          Ch Diary ={">"} {user.nickname}
        </a>
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
              [...links.entries()].map(([key, value], index) =>
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


const mapStateToProps = (state: RootState) => ({
  user: state.user.data
});

export default connect(mapStateToProps)(Header);
