import React from 'react';
import Parse from 'parse';
import { fabric } from 'fabric';
import { fabricCanvas } from '../Canvas/ReactFabricCanvas';

export default class ObjectLibrary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      objects: [],
    };
  }

  componentDidMount() {
    this.fetchObjects();
  }

  createObject(object) { // eslint-disable-line
    switch (object) {
      case 'bookshelf':
        this.onCreateBookshelf();
        break;
      case 'wall':
        this.onCreateWall();
        break;
      case 'door':
        this.onCreateDoor();
        break;
      default:
    }
  }

  onCreateBookshelf() { // eslint-disable-line
    const redSquare = new fabric.Rect({
      width: 50,
      height: 50,
      top: 20,
      left: 20,
      originX: 'center',
      originY: 'center',
      fill: 'brown',
    });

    fabricCanvas.add(redSquare);
    fabricCanvas.setActiveObject(redSquare);
    fabricCanvas.fire('saveData');
  }

  onCreateWall() { // eslint-disable-line
    const redSquare = new fabric.Rect({
      width: 50,
      height: 50,
      top: 20,
      left: 20,
      originX: 'center',
      originY: 'center',
      fill: 'black',
    });

    fabricCanvas.add(redSquare);
    fabricCanvas.setActiveObject(redSquare);
    fabricCanvas.fire('saveData');
  }

  onCreateDoor() { // eslint-disable-line
    const redSquare = new fabric.Rect({
      width: 50,
      height: 50,
      top: 20,
      left: 20,
      originX: 'center',
      originY: 'center',
      fill: 'blue',
    });

    fabricCanvas.add(redSquare);
    fabricCanvas.setActiveObject(redSquare);
    fabricCanvas.fire('saveData');
  }

  fetchObjects() {
    this.setState({
      isLoading: true,
    });

    const libraryObject = Parse.Object.extend('LibraryObject');
    const query = new Parse.Query(libraryObject);
    query.find({
      success: (response) => {
        this.setState({
          objects: response,
          isLoading: false,
        });
      },
      error: () => {
        this.setState({
          isLoading: false,
        });
      },
    });
  }

  render() {
    // loading
    if (this.state.isLoading) {
      return (
        <div>
          <h1>Object Library</h1>
          <h3>Loading</h3>
        </div>
      );
    }

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
    if (this.state.objects.length === 0) {
      objectLibrary = (
        <h3>No objects</h3>
      );
    } else {
      objectLibrary = (
        <ul>
          {this.state.objects.sort(compare).map((object) => { // eslint-disable-line
            return (
              <li key={object.id}>
                <button onClick={() => { this.createObject(object.get('type')); }}>
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
        <h1>Object Library</h1>
        {objectLibrary}
      </div>
    );
  }
}
