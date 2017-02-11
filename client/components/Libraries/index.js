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
    const name = library.get('name');
    return (
      <div key={key}>
        <li>
          <Link to={'/editor/' + key}>{name}</Link>
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

    return (
      <div>
        <h1>Libraries</h1><br />
        <div style={{ overflow: 'auto', maxHeight: 400 }}>
          <ul>
            {this.state.libraries.map(this.renderLibrary)}
          </ul>
        </div>
        { this.renderNewLibraryButton() }
        <br />
        { this.renderLogoutButton() }
      </div>
    );
  }
}
