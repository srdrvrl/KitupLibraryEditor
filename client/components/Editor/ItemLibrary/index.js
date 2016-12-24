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
    const imgStyle = {
      width: 20,
      height: 20,
    };

    let objectLibrary = null;
    if (this.props.items.length === 0) {
      objectLibrary = (
        <h3>Loading</h3>
      );
    } else {
      objectLibrary = (
        <ul>
          {this.props.items.sort(compare).map((object) => { // eslint-disable-line
            return (
              <li key={object.id}>
                <button onClick={() => { this.props.onItemCreate(object.get('type')); }}>
                  <img style={imgStyle} alt={object.get('type')} src={object.get('iconUrl')} />
                  {object.get('type')}
                </button>
              </li>
            );
          })}
        </ul>
      );
    }

    // render component
    return (
      <div>
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
