import React from 'react';

interface LoginProps {

}

interface LoginState {
  inputs: { [x: string]: string }
}

// interface Iinputs {
//   email: string
//   pass: string
// }

// class Login extends React.Component<{}, { inputs: Iinputs }> {
// class Login extends React.Component {
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      inputs: {}
    };
  }
  //   constructor(props: {}, context: any) {
  //     super(props, context);

  //     this.state = { description: '' };
  // }
  // state = { :  }
  // constructor(props: any) {
  //   super(props);
  //   // this.state = {
  //   //   inputs: { email: '', pass: '' }
  //   // };
  // }
  // state = { inputs: { email: '', pass: '' } }
  // onChange(e: React.FormEvent<HTMLInputElement>) {
  //   const { name, value } = e.currentTarget
  //   this.setState({
  //     [name]: value
  //   });
  //   console.log(this.state);
  // }

  render() {
    // const [inputs, setInputs] = useState<Iinputs>({ email: '', pass: '' });

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      //   // const name = event.currentTarget.name;
      //   // const value = event.currentTarget.value;
      console.log("fef", name, value)
      this.setState(values => ({ ...values, inputs: { [name]: value } }))
      //   // this.setState(function (values) {
      //   //   console.log(
      //   //     values
      //   //   )
      //   //   return { ...values, values[name]: value   }
      //   // })
      //   // this.setState({
      //   //   inputs[name]: value
      //   // })
      console.log(this.state);

    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      console.log(this.state.inputs);
    }

    return (
      <div className="loginContainer">
        <p>FAFA</p>
        <form onSubmit={handleSubmit}>
          <label>Enter your email:<br />
            <input
              type="text"
              name="email"
              value={this.state.inputs.email || ""}
              // onChange={this.handle}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>Enter your pass:<br />
            <input
              type="text"
              name="pass"
            // value={this.state.inputs.pass}
            // onChange={handleChange}
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