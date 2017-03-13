import React from 'react';
import { LibraryLevel } from '../../../Models';

export default class LevelInspector extends React.Component {

  renderItem(item) {
    return (
      <li key={item.id}>
        <div>
          <button onClick={() => { this.props.onItemClick(item); }}>{item.type}</button>
          <br />
          <label htmlFor="item">{item.id}</label>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div style={{ overflow: 'scroll' }}>
        <h1>Level Inspector</h1>
        <h3>Level {this.props.level.level} - {this.props.level.items.length} items</h3>
        <ul>
          {this.props.level.items.map(this.renderItem.bind(this))}
        </ul>
      </div>
    );
  }
}

LevelInspector.propTypes = {
  onItemClick: React.PropTypes.func,
  level: React.PropTypes.shape({ type: React.PropTypes.oneOf([LibraryLevel]) }),
};
