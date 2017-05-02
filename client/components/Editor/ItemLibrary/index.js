import React from 'react';
import Parse from 'parse';

export default class ItemLibrary extends React.Component {

  render() {
    // sort objects by their name
    const compare = (a, b) => {
      if (a.get('type') < b.get('type')) {
        return -1;
      } else if (a.get('type') > b.get('type')) {
        return 1;
      }
      return 0;
    };

    // render object library part
    const styless = {
      imgStyle:{
      width: 20,
      height: 20,

    },

      li: {
        listStyle: 'none',
        float: 'left',
        margin: '0 0 5px 0',

      },

      ul: {
        float: 'left',
      },

      button: {
        backgroundColor:'#c0392b',
        color:'rgb(255,255,255)',
        borderRadius: '5px',
        height: '40px',
        textShadow:'0px 1px 0px rgba(0,0,0,0.5)',
        boxShadow:'0px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
      },

    };

    let objectLibrary = null;
    if (this.props.items.length === 0) {
      objectLibrary = (
        <h3>Loading</h3>
      );
    } else {
      objectLibrary = (
        <ul style = {styless.ul}>
          {this.props.items.sort(compare).map((object) => { // eslint-disable-line
            return (
              <li style = {styless.li} key={object.id}>
                <button style={styless.button} onClick={() => { this.props.onItemCreate(object.get('type')); }}>
                  <img style={styless.imgStyle} alt={object.get('type')} src={object.get('iconUrl')} />
                  {object.get('type')}
                </button>
              </li>
            );
          })}
        </ul>
      );
    }
    const styles = {
      divs: {
        listStyle:'none',
        padding:2,
        margin:0,
        color: 'white',
      }
    };
    // render component
    return (
      <div style= {styles.divs}>
        <h1>Item Library</h1>
        {objectLibrary}
      </div>
    );
  }
}

ItemLibrary.propTypes = {
  onItemCreate: React.PropTypes.func,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({ type: React.PropTypes.oneOf([Parse.Object]) })),
};
