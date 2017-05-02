import React from 'react';
import Parse from 'parse';
import Request from 'superagent';



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

    var styles ={


      inputBox : {
        width: '95%',
        padding: '10px',
        border: 'solid 1px #fff',
        boxShadow: 'inset 1px 1px 2px 0 #707070',
        transition: 'box-shadow 0.3s',

      },

      heading :{
        listStyle:'none',
        color: 'white',
        background: '#005897',
        fontSize: '32.5px',
        lineHeight: '74px',
        fontWeight: '700px',
        fontFamily: 'Libre Baskerville',
        margin: '0 5px 24px',
        float: 'left',
        padding: '10px',
      },

      button: {
        fontSize: 18,
        borderRadius: '6px',
        border: '1px solid #005897',


      },


      formStyle7 : {


        maxWidth:'310px',
        margin:'50px auto',
        background:'#fff',
        borderRadius:'2px',

        fontFamily: 'Georgia',

        textAlign: 'center',

        margin: 'auto',
        width: '50%',
        border: '3px solid #005897',
        padding: '10px',
        color: '#5C5C5C',
        fontsize:'x-large',
      },

      formStyle7ul:{
        listStyle:'none',
        padding:0,
        margin:0,
      },

      formStyle7li:{
        display: 'block',
        padding: '9px',
        border:'1px solid #DDDDDD',
        marginBottom: '30px',
        borderRadius: '3px',
      },

      formStyle7li3:{
        display: 'block',
        padding: '9px',
        border:'1px solid #DDDDDD',
        marginBottom: '30px',
        borderRadius: '3px',

        border:'none',
        marginBottom: '0px',
        textAlign: 'center',
      },
    };


    return (

      <form style = {styles.formStyle7}>

      <ul style = {styles.formStyle7ul}>
      <li style = {styles.heading}>
      KitUp Library Editor
      </li>

      <li style = {styles.formStyle7li}>

        <input
          style = {styles.inputBox}
          placeholder="Username"
          type="text"
          name="username"
          maxlength="100"
          value={this.state.username}
          onChange={this.handleChange}
        />

      </li>
      <li style = {styles.formStyle7li}>

        <input
          style = {styles.inputBox}
          placeholder="Password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

      </li>
      <li style = {styles.formStyle7li3}>
      <button style={styles.button} type="button" onClick={this.handleSubmit}>
        Submit
      </button>
      </li>
      </ul>
      </form>


    );
  }
}

Login.propTypes = {
  onLoginSuccess: React.PropTypes.func,
  onLoginFailed: React.PropTypes.func,
  onLogin: React.PropTypes.func,
};
