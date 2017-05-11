import React from 'react';
import Parse from 'parse';
import Link from 'react-router/Link';


export default class Libraries extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      libraries: [],
    };
  }

  componentDidMount() {
    this.fetchLibraries();
  }

  onLogout() {
    Parse.User.logOut();
  }

  fetchLibraries() {
    this.setState({
      isLoading: true,
      libraries: [],
    });

    const lib = Parse.Object.extend('Library');
    const query = new Parse.Query(lib);
    query.equalTo('owner', Parse.User.current());
    query.find({
      success: (response) => {
        this.setState({
          isLoading: false,
          libraries: response,
        });
      },
      error: (error) => {
        // TODO: Implement error - retry state
        console.log(error);
        this.setState({
          isLoading: false,
          libraries: [],
        });
      },
    });
  }

  renderLibrary(library) {
    const key = library.id;
    const name = library.get('name',);

    const styles = {
      li:{
        fontFamily: 'Oswald',
        backgroundImage: 'url(https://i.hizliresim.com/R0jvY6.jpg) ',
        backgroundRepeat: 'x-repeat',
        borderRadius: '11px',
        fontSize: '1.5em',
        lineHeight: '40px',
        color: 'green',
        height: '35px',
        borderBottom: '1px solid black',

      },
        span :{
          color: 'white',
        },
    }

    return (
      <div key={key}>
        <li style= {styles.li}>
        <span style={styles.span}>  <Link to={'/editor/' + key}>{name}</Link> </span>
        </li>
      </div>
    );
  }

  renderNewLibraryButton() {
    return (
      <Link to="/editor">Add new library</Link>
    );
  }

  renderLogoutButton() {
    return (
      <button onClick={this.onLogout}>Logout</button>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <p>Loading..</p>
      );
    }

    if (this.state.libraries.length === 0) {
      return (
        <div>
          <h1>Libraries</h1><br />
          <h3>You have no libraries</h3><br />
          { this.renderNewLibraryButton() }
          { this.renderLogoutButton() }
        </div>
      );
    }

    var styles = {
      div1:{
        backgroundImage: 'url(https://i.hizliresim.com/GBjJ22.jpg) ',

      },

      ul:{
        listStyle: 'none',

        textAlign: 'left',
        padding: 0,
        margin: 0,
      },

      h1: {
        color: '#FFD700',
        fontSize: '50px',
  fontFamily: 'Arvo',
  fontWeight: 'bold',
  textShadow: '2px 2px 0 #a43',
  lineHeight: '0.8em',

  transform: 'scaleY(0.7)',
  margin:0,
  textAlign: 'center',
      },
      listI:{
        color: '#FFD700',
        textShadow: '1px 1px 0 blue',
      },


    };

    return (



      <div style= {styles.div1}>
        <div>
          <h1 style={styles.h1}>Libraries</h1><br />
          <div style={{ overflow: 'auto', maxHeight: 400 }}>
            <ul style= {styles.ul}>
                <li style={styles.listI}>

              {this.state.libraries.map(this.renderLibrary)}
                </li>
            </ul>
            <br/>
          </div>
          <div style={styles.listI}>
          { this.renderNewLibraryButton() }
          </div>
          <br />
          { this.renderLogoutButton() }
        </div>
      </div>
    );
  }
}
