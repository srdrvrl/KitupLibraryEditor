import React from 'react';
import { fabric } from 'fabric';
import Nuclear from 'nuclear-js';

// Nuclear store data keys
const reactorDataKeys = {
  fabricData: null,
  activeObject: null,
};

// Create nuclear reactor
const reactor = Nuclear.Reactor({
  debug: true,
});

const fabricStore = Nuclear.Store({
  getInitialState() {
    return Nuclear.toImmutable({
      fabricData: {
        objects: [],
      },
      activeObject: false,
    });
  },
  initialize() {
    this.on(reactorDataKeys.fabricData, this.saveFabricData);
    this.on(reactorDataKeys.activeObject, this.saveActiveObject);
  },
  saveFabricData(state, fabricData) {
    return state.set('fabricData', Nuclear.toImmutable(fabricData));
  },
  saveActiveObject(state, value) {
    return state.set('activeObject', value);
  },
});

reactor.registerStores({
  fabricStore,
});

// Global fabric canvas
export let fabricCanvas;
export default class ReactFabricCanvas extends React.Component {

  componentDidMount() {
    // create fabric canvas on element
    fabricCanvas = new fabric.Canvas('fabricCanvas');

    // on mouse up lets save some state
    fabricCanvas.on('mouse:up', () => {
      reactor.dispatch(reactorDataKeys.fabricData, fabricCanvas.toObject());
      reactor.dispatch(reactorDataKeys.activeObject, !!fabricCanvas.getActiveObject());
    });

    // an event we will fire when we want to save state
    fabricCanvas.on('saveData', () => {
      reactor.dispatch(reactorDataKeys.fabricData, fabricCanvas.toObject());
      reactor.dispatch(reactorDataKeys.activeObject, !!fabricCanvas.getActiveObject());
      fabricCanvas.renderAll(); // programatic changes we make will not trigger a render in fabric
    });

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
          { stroke: this.props.gridColor, selectable: false });
        gridLines.push(line);
      }

      // horizontal
      for (let y = 0; y < height; y += gridSize) {
        const line = new fabric.Line(
          [0, y, width, y],
          { stroke: this.props.gridColor, selectable: false });
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

    fabricCanvas.on({
      'object:moving': (object) => {
        object.target.set({
          left: Math.round(object.target.left / this.props.gridSize) * this.props.gridSize,
          top: Math.round(object.target.top / this.props.gridSize) * this.props.gridSize,
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
