import React from 'react';

export default class LibraryInspector extends React.Component {

  renderLevel(level) {
    const levelName = 'Level ' + level.level;
    return (
      <li key={level.id}>
        <button onClick={() => { this.props.onLevelClick(level); }}>
          {levelName}
        </button>
      </li>
    );
  }

  render() {
    const styles = {
      button: {
        backgroundColor:'#4D1335',
        color:'rgb(255,255,255)',
        borderRadius: '5px',
        height: '40px',
        textShadow:'0px 1px 0px rgba(0,0,0,0.5)',
        boxShadow:'0px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
      },
    }

    return (
      <div>
        <h1>Library Inspector</h1>
        <h3>{this.props.library.name}</h3>
        <div>
          <ul >
            {this.props.library.levels.map(this.renderLevel.bind(this))}
          </ul>
        </div>
        <div>
          <button style={styles.button} onClick={this.props.onLevelCreate}>Add New Level</button>
          <button style={styles.button} onClick={this.props.onLevelRemove}>Remove Level</button>
          <button style={styles.button} onClick={this.props.onSave}>Save</button>
        </div>
      </div>
    );
  }
}

LibraryInspector.propTypes = {
  library: React.PropTypes.object,
  onLevelCreate: React.PropTypes.func,
  onLevelRemove: React.PropTypes.func,
  onLevelClick: React.PropTypes.func,
  onSave: React.PropTypes.func,
};
