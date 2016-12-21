import React from 'react';
import { fabric } from 'fabric';
import ReactFabricCanvas, { fabricCanvas } from './ReactFabricCanvas';

export default class Canvas extends React.Component {

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
