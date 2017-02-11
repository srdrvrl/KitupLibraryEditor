import React from 'react';
import { fabric } from 'fabric';

// Global fabric canvas
export let fabricCanvas;
export default class ReactFabricCanvas extends React.Component {

  componentDidMount() {
    // create fabric canvas on element
    fabricCanvas = new fabric.Canvas('fabricCanvas');

    this.drawGrid();
    this.addSnapToGrid();
  }

  drawGrid() {
    const gridSize = this.props.gridSize;
    if (gridSize) {
      const gridLines = [];
      const width = fabricCanvas.getWidth();
      const height = fabricCanvas.getHeight();

      // vertical
      for (let x = 0; x < width; x += gridSize) {
        const line = new fabric.Line(
          [x, 0, x, height],
          { stroke: this.props.gridColor, selectable: false, name: 'gridLine' });
        gridLines.push(line);
      }

      // horizontal
      for (let y = 0; y < height; y += gridSize) {
        const line = new fabric.Line(
          [0, y, width, y],
          { stroke: this.props.gridColor, selectable: false, name: 'gridLine' });
        gridLines.push(line);
      }

      // draw lines
      for (let line of gridLines) { // eslint-disable-line
        fabricCanvas.add(line);
        fabricCanvas.sendBackwards(line);
      }
    }
  }

  addSnapToGrid() {
    if (this.props.isSnapsToGrid === false) {
      return;
    }

    const gridSize = this.props.gridSize;
    fabricCanvas.on({
      'object:moving': (object) => {
        object.target.set({
          left: Math.round(object.target.left / gridSize) * gridSize,
          top: Math.round(object.target.top / gridSize) * gridSize,
        });
      },
    });
  }

  render() {
    const style = {
      border: '1px solid',
    };

    return (
      <canvas
        id="fabricCanvas"
        width={this.props.width}
        height={this.props.height}
        style={style}
      />
    );
  }
}

ReactFabricCanvas.defaultProps = {
  gridColor: '#ccc',
  isSnapsToGrid: true,
};

ReactFabricCanvas.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  gridSize: React.PropTypes.number,
  gridColor: React.PropTypes.string,
  isSnapsToGrid: React.PropTypes.bool,
};
