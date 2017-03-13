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
    return (
      <div>
        <h1>Library Inspector</h1>
        <h3>{this.props.library.name}</h3>
        <div>
          <ul>
            {this.props.library.levels.map(this.renderLevel.bind(this))}
          </ul>
        </div>
        <div>
          <button onClick={this.props.onLevelCreate}>Add New Level</button>
          <button onClick={this.props.onLevelRemove}>Remove Level</button>
          <button onClick={this.props.onSave}>Save</button>
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
