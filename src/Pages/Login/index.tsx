import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { logMeIn, setEmail, setPassword } from '../../redux/loginSlice';
// import { updateUserInformations } from '../../redux/userSlice';
// import { LoginResponse } from '../../types';
// import { newFetch } from '../../utils/fetchInstance';
// import { ToastError, ToastSucces } from '../../utils/util';

// interface LoginProps {
//   dispatch: Dispatch;
//   user: UserData;
// }

interface LoginState {
  inputs: { [x: string]: string }
}

interface InputsType {
  [x: string]: string
}

interface InputsTypeV2 {
  data:
  {
    email?: string
    password?: string
  }
}

const Login = () => {
  const userData = useAppSelector(state => state.user.data)
  // const [Email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");
  // const [Inputs, setInputs] = useState({
  //   data: { email: '', password: '' }
  // } as InputsTypeV2);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  // useEffect(() => {
  //   if (Email) {
  //     console.log("Email", Email);
  //   }
  // }, [Email]);

  // useEffect(() => {
  //   if (Password) {
  //     console.log("Password", Password);
  //   }
  // }, [Password]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (EmailRef.current) {
    //   setEmail(EmailRef.current.value);
    // }
    dispatch(logMeIn())
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // newFetch<LoginResponse>({
    //   url: `/api/auth/login`,
    //   newFetchResolve: (response) => {
    //     dispatch(logIn(response.accessToken))
    //     ToastSucces('Login Succeed ')
    //   },
    //   newFetchReject: (err) => {
    //     ToastError(`Login Failed ${err.message} `)
    //   },
    //   config: {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(Inputs)
    //   }
    // })
  }

  return (
    <div className="loginContainer">
      <p>FAFA {userData.email}</p>
      <form onSubmit={(e) => { submitHandler(e) }}>
        <label>Enter your email:<br />
          <input
            type="text"
            name="email"
            // ref={EmailRef}
            onChange={(e) => {
              dispatch(setEmail(e.target.value))
            }}

          // value={Inputs.data.email}
          // onChange={handleChange}
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

  // class Login extends React.Component<LoginProps, LoginState> {
  //   constructor(props: LoginProps) {
  //     super(props);
  //     this.state = {
  //       inputs: { email: '', password: '' }
  //     };
  //   }

  //   componentDidMount() {
  //     console.log(this.state);
  //   }

  //   handleSubmit = (event: React.FormEvent) => {
  //     event.preventDefault();
  //     console.log(this.state.inputs);

  //     newFetch<LoginResponse>({
  //       url: `/api/auth/login`,
  //       newFetchResolve: (response) => {
  //         this.props.dispatch(logIn(response.accessToken))
  //         ToastSucces('Login Succeed ')
  //       },
  //       newFetchReject: (err) => {
  //         ToastError(`Login Failed ${err.message} `)
  //       },
  //       config: {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json, text/plain, */*',
  //           'Content-Type': 'application/json'
  //         },
  //         credentials: 'include',
  //         body: JSON.stringify(this.state.inputs)
  //       }
  //     })
  //   }

  //   render() {
  //     const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
  //       const { name, value } = event.currentTarget
  //       this.setState({
  //         inputs: {
  //           ...this.state.inputs,
  //           [name]: value
  //         }
  //       })
  //     }

  //     return (
  //       <div className="loginContainer">
  //         <p>FAFA {this.props.user.email}</p>
  //         <form onSubmit={this.handleSubmit}>
  //           <label>Enter your email:<br />
  //             <input
  //               type="text"
  //               name="email"
  //               value={this.state.inputs.email}
  //               onChange={handleChange}
  //             />
  //           </label>
  //           <br />
  //           <label>Enter your pass:<br />
  //             <input
  //               type="password"
  //               name="password"
  //               value={this.state.inputs.password}
  //               onChange={handleChange}
  //             />
  //           </label>
  //           <br />
  //           <input type="submit" />
  //         </form>
  //       </div>
  //     );
  //   }
  // }


// const mapStateToProps = (state: RootState) => ({
//   user: state.user.data
// });

// export default connect(mapStateToProps)(Login);
