import React from 'react';
import Parse from 'parse';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    if (e.target.name === 'username') {
      this.setState({
        username: value,
      });
    } else if (e.target.name === 'password') {
      this.setState({
        password: value,
      });
    }
  }

  handleSubmit() {
    if (this.state.username === '' || this.state.password === '') {
      alert('Please enter both your username & password');
      return;
    }

    this.props.onLogin();
    Parse.User.logIn(this.state.username, this.state.password, {
      success: () => {
        this.props.onLoginSuccess();
      },
      error: () => {
        this.props.onLoginFailed();
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1><br />
        <form>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label><br />
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label><br />
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginSuccess: React.PropTypes.func,
  onLoginFailed: React.PropTypes.func,
  onLogin: React.PropTypes.func,
};
