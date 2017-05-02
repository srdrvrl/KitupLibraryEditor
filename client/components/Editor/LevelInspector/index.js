import React from 'react';
import { LibraryLevel } from '../../../Models';

export default class LevelInspector extends React.Component {

  renderItem(item) {

    const style = {
      li : {
        listStyle: 'none',
      },

      button: {
        backgroundColor:'#D050EF',
        color:'rgb(255,255,255)',
        borderRadius: '5px',
        height: '40px',
        textShadow:'0px 1px 0px rgba(0,0,0,0.5)',
        boxShadow:'0px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
      },
      button2: {
        backgroundColor:'red',
        color:'rgb(255,255,255)',
        borderRadius: '5px',
        height: '20px',
        textShadow:'0px 1px 0px rgba(0,0,0,0.5)',
        boxShadow:'0px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
      },

    }

    return (
      <li style={style.li} key={item.id}>
        <div>
          <button style={style.button} onClick={() => { this.props.onItemClick(item); }}>{item.type}</button>
          &nbsp;
          <label htmlFor="item">{item.id}</label>&nbsp;&nbsp;
          <button style={style.button2} >Remove</button>
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
