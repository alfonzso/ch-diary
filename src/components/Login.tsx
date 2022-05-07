import React from 'react';
// import jwt_decode from 'jwt-decode';
// import dayjs from 'dayjs'
import fetchInstance from '../utils/fetchInstance';
import inMemoryJWTManager from "../utils/inMemoryJwt"

interface LoginProps {

}

interface LoginState {
  inputs: { [x: string]: string }
}


// class Login extends React.Component<{}, { inputs: Iinputs }> {
// class Login extends React.Component {
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

  render() {
    // const [inputs, setInputs] = useState<Iinputs>({ email: '', pass: '' });

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

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      console.log(this.state.inputs);

      fetch('http://localhost:2602/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(this.state.inputs)
      }).then(res => res.json())
        .then(async function (res) {
          console.log('--->', res)
          // console.log(res.accessToken)
          // const token: any = jwt_decode(res.accessToken)
          // console.log(token)
          // console.log(token.exp)
          // console.log(dayjs.unix(token.exp).diff(dayjs()))
          // console.log(dayjs.unix(token.exp).diff(dayjs()) < 1)
          inMemoryJWTManager.setToken(res.accessToken)
          const diaryRes = await fetchInstance("/api/v1/diary/test")
          console.log(
            diaryRes.response, diaryRes.data
          )

        });


    }

    return (
      <div className="loginContainer">
        <p>FAFA</p>
        <form onSubmit={handleSubmit}>
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