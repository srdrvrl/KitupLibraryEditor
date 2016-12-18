import React from 'react';
import { fabric } from 'fabric';
import ReactFabricCanvas, { fabricCanvas } from './ReactFabricCanvas';

export default class Canvas extends React.Component {

  onAddObject() {
    const redSquare = new fabric.Rect({
      width: 10,
      height: 10,
      top: 20,
      left: 20,
      originX: 'center',
      originY: 'center',
      fill: '#BBB',
    });

    fabricCanvas.add(redSquare);
    fabricCanvas.setActiveObject(redSquare);
    fabricCanvas.fire('saveData');
  }

  render() {
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
          <button onClick={this.onAddObject}>Add</button>
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
