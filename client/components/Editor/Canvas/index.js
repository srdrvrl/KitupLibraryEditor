import React from 'react';
import ReactFabricCanvas, { fabricCanvas } from './ReactFabricCanvas';
import { LibraryLevel } from '../../../Models';

export default class Canvas extends React.Component {

  componentDidMount() {
    this.setupCanvas();
  }

  setupCanvas() {
    // Setup events
    fabricCanvas.on({
      'object:modified': (object) => {
        this.props.onItemModified(object);
      },
      'object:selected': (object) => {
        this.props.onItemSelect(object);
      },
      'selection:cleared': () => {
        this.props.onItemSelect(null);
      },
    });
  }

  render() {
    const level = this.props.level;
    for (const item of level.items) {
      item.fabricObject.active = item.isActive;
      fabricCanvas.add(item.fabricObject);
    }

    const containerStyle = {
      position: 'relative',
    };

    const centerStyle = {
      width: '70%',
      height: 'auto',
      margin: '0 auto',
      padding: '10px',
      position: 'relative',
    };

    return (
      <div style={containerStyle}>
        <div style={centerStyle}>
          <ReactFabricCanvas
            width={500}
            height={500}
            gridSize={10}
          />
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  level: React.PropTypes.shape({ type: React.PropTypes.oneOf([LibraryLevel]) }),
  onItemSelect: React.PropTypes.func,
  onItemModified: React.PropTypes.func,
};
