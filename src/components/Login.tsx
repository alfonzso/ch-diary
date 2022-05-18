import React from 'react';
// import jwt_decode from 'jwt-decode';
import fetchInstance from '../utils/fetchInstance';
import inMemoryJWTManager from "../utils/inMemoryJwt"
import { baseURL } from "../App";
// import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { add } from '../redux/user';
import { UserData } from '../types';

interface LoginProps {

}

interface LoginState {
  inputs: { [x: string]: string }
}


// class Login extends React.Component<{}, { inputs: Iinputs }> {
// class Login extends React.Component {
class Login extends React.Component<any, LoginState> {
  // userData: UserData;
  // dispatch: any;
  constructor(props: LoginProps) {

    super(props);

    // this.userData = useAppSelector(state => state.user.userData)
    // this.dispatch = useAppDispatch()

    this.state = {
      inputs: { email: '', password: '' }
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  // handleSubmit(event: React.FormEvent) {
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(this.state.inputs);

    fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(this.state.inputs)
    }).then(res => res.json())
      .then(async (res) => {
        console.log('--->', res)
        inMemoryJWTManager.setToken(res.accessToken)
        // const { fetchObject: diaryObject } = await fetchInstance("/api/diary/test")
        console.log(
          "================>", this.props
        )
        const { fetchObject } = await fetchInstance("/api/user/getUser")
        const { dispatch, userData } = this.props;
        dispatch(add(fetchObject.body as UserData))

        // this.dispatch(add(fetchObject.body as UserData))
        console.log(
          userData, fetchObject
        )
        // console.log(
        //   diaryObject.response.statusText, diaryObject.response, diaryObject.body, diaryObject
        // )
      });
  }

  render() {
    const { userData } = this.props;

    // const [inputs, setInputs] = useState<Iinputs>({ email: '', pass: '' });

    // const userData = useAppSelector(state => state.user.userData)
    // const dispatch = useAppDispatch()

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      // console.log("fef", name, value)
      // this.setState(values => ({ ...values, inputs: { [name]: value } }))
      this.setState({
        inputs: {
          ...this.state.inputs,
          [name]: value
        }
      })
      // console.log(this.state);
    }



    return (
      <div className="loginContainer">
        <p>FAFA {userData.email}</p>
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

export default Login;