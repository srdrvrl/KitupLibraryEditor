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

    if (fabricCanvas) {
      fabricCanvas._objects = fabricCanvas._objects.filter(object => object.name === 'gridLine');
      for (const item of level.items) {
        fabricCanvas.add(item.fabricObject);
        // fabricCanvas._objects.push(item.fabricObject);
      }
      // fabricCanvas.renderAll();
      console.log(fabricCanvas);
    }

    const containerStyle = {
      position: 'relative',

    };

    const centerStyle = {
      width: '70%',
      float: 'left',
      height: 'auto',
      margin: '0 auto',
      padding: 0,

      position: 'relative',
    };

    return (
      <div style={containerStyle}>
        <div style={centerStyle}>
          <ReactFabricCanvas
            width={510}
            height={510}
            gridSize={10}
            gridColor='#BB8E84'
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
