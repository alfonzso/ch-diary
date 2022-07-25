import React from 'react';
import fetchInstance, { newFetch, newFetchWithAuth } from '../../utils/fetchInstance';
import inMemoryJWTManager from "../../utils/inMemoryJwt"
import { baseURL } from '../App';
import { addUser } from '../../redux/user';
import { LoginResponse, TokenResponse, UserData, userInfoFromToken } from '../../types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { RootState } from '../../redux/store';

interface LoginProps {
  dispatch: Dispatch;
  user: UserData;
}

interface LoginState {
  inputs: { [x: string]: string }
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      inputs: { email: '', password: '' }
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(this.state.inputs);

    newFetch<LoginResponse>(
      `/api/auth/login`,
      (response) => {
        inMemoryJWTManager.setToken(response.accessToken)
        this.props.dispatch(addUser(response.accessToken))
      },
      undefined,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(this.state.inputs)
      }
    )

    // fetch(`${baseURL}/api/auth/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify(this.state.inputs)
    // }).then(res => res.json())
    //   .then(async (res) => {
    //     console.log('--->', res)
    //     inMemoryJWTManager.setToken(res.accessToken)
    //     // const { fetchObject } = await fetchInstance("/api/user/getUser")
    //     this.props.dispatch(addUser(res.accessToken as string))
    //   });
  }

  render() {
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      this.setState({
        inputs: {
          ...this.state.inputs,
          [name]: value
        }
      })
    }

    return (
      <div className="loginContainer">
        <p>FAFA {this.props.user.email}</p>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your email:<br />
            <input
              type="text"
              name="email"
              value={this.state.inputs.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>Enter your pass:<br />
            <input
              type="password"
              name="password"
              value={this.state.inputs.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state: RootState) => ({
  user: state.user.data
});

export default connect(mapStateToProps)(Login);
