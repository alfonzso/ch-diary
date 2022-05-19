import React from "react";
import "./navbar.css"
import { Link, Outlet } from "react-router-dom";
import { UserData } from '../types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { RootState } from '../redux/store';

interface NavbarProps {
  // userData: userData
  dispatch: Dispatch;
  user: UserData;
}

interface NavbarState {

}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  // state = { :  }

  render() {
    // const { userData } = this.props;
    return (
      <div>
        <nav className="navigation">
          <a href="/" className="brand-name">
            Ch Diary ={">"} {this.props.user.nickname}
          </a>
          <button className="hamburger">
            {/* icon from heroicons.com */}
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
            className="navigation-menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/test">Test</Link>
              </li>
            </ul>
          </div>

        </nav>
        <Outlet />
      </div>
    );
  }
}

// export default Navbar;

const mapStateToProps = (state: RootState) => ({
  user: state.user.data
});

export default connect(mapStateToProps)(Navbar);
