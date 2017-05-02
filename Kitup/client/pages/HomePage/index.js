import React from 'react';
import Parse from 'parse';
import Login from '../../components/Login';
import Libraries from '../../components/Libraries';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);

    this.state = {
      isLoggingIn: false,
    };
  }

  onLogin() {
    this.setState({
      isLoggingIn: true,
    });
  }

  onLoginSuccess() {
    this.setState({
      isLoggingIn: false,
    });
  }

  onLoginFailed() {
    this.setState({
      isLoggingIn: false,
    });
  }

  renderLogin() {
    return (
      <div>
        <Login
          onLogin={this.onLogin}
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailed={this.onLoginFailed}
        />
      </div>
    );
  }

  renderHome() {
    return (
      <div>
        <Libraries />
      </div>
    );
  }

  render() {
    if (Parse.User.current()) {
      return this.renderHome();
    }
    return this.renderLogin();
  }
}
