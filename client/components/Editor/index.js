import React from 'react';
import Parse from 'parse';
import { fabric } from 'fabric';

import { Layout, Flex, Fixed } from 'react-layout-pane';
import { LibraryObject, LibraryLevel, Bookshelf, Door, Wall } from '../../Models';
import { fabricCanvas } from './Canvas/ReactFabricCanvas';

import LibraryInspector from './LibraryInspector';
import LevelInspector from './LevelInspector';
import ItemLibrary from './ItemLibrary';
import ItemInspector from './ItemInspector';
import Canvas from './Canvas';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      library: props.library || new LibraryObject(),
      itemLibrary: [],
    };
  }

  componentDidMount() {
    this.fetchItemLibrary();
  }

  // Fetch

  fetchItemLibrary() {
    const libraryObject = Parse.Object.extend('LibraryObject');
    const query = new Parse.Query(libraryObject);
    query.find({
      success: (response) => {
        this.setState({
          itemLibrary: response,
        });
      },
      error: () => {
        this.setState({
          itemLibrary: [],
        });
      },
    });
  }

  // Level

  getActiveLevel() {
    return this.state.library.getActiveLevel();
  }

  setActiveLibraryLevel(level) {
    const library = this.state.library;
    library.setActiveLevel(level);
    this.setState({
      library,
    });
  }

  // Item

  getActiveItem() {
    return this.getActiveLevel().getActiveItem();
  }

  updateActiveItem(newItem) {
    const library = this.state.library;
    const level = library.getActiveLevel();
    level.updateActiveItem(newItem);
    this.setState({
      library,
    });
  }

  setActiveItem(item) {
    const library = this.state.library;
    const level = library.getActiveLevel();
    level.setActiveItem(item);
    this.setState({
      library,
    });
  }

  createItem(itemType) {
    const library = this.state.library;
    const level = library.getActiveLevel();

    let item;
    switch (itemType) {
      case 'bookshelf':
        item = new Bookshelf();
        break;
      case 'wall':
        item = new Wall();
        break;
      case 'door':
        item = new Door();
        break;
      default:
        return;
    }

    level.addItem(item);
    this.setState({
      library,
    });
  }

  onItemDidUpdate(property, value) {
    const item = this.getActiveItem();

    switch (property) {
      case 'x':
        item.fabricObject.setLeft(value);
        break;
      case 'y':
        item.fabricObject.setTop(value);
        break;
      case 'w':
        item.fabricObject.setWidth(value);
        break;
      case 'h':
        item.fabricObject.setHeight(value);
        break;
      case 'sx':
        item.fabricObject.setScaleX(value);
        break;
      case 'sy':
        item.fabricObject.setScaleY(value);
        break;
      case 'a':
        item.fabricObject.setAngle(value);
        break;
      default:
    }

    this.updateActiveItem(item);
  }

  // Canvas

  onCanvasItemSelect(item) {
    if (item) {
      this.setActiveItem(item.target);
    } else {
      this.setActiveItem();
    }
  }

  onCanvasItemModified(item) {
    const library = this.state.library;
    const level = library.getActiveLevel();
    const activeItem = level.getActiveItem();
    activeItem.fabricObject = item.target;
    level.updateActiveItem(activeItem);
    this.setState({
      library,
    });
  }

  // Render

  render() {
    return (
      <div>
        <Layout type="row">
          <Fixed style={{ width: '15rem', background: '#2980B9' }}>
            <Layout type="column">
              <Flex>
                <ItemLibrary
                  items={this.state.itemLibrary}
                  onItemCreate={(type) => { this.createItem(type); }}
                />
              </Flex>
              <Fixed style={{ height: '8rem' }}>
                <ItemInspector
                  item={this.getActiveItem()}
                  onItemChange={(a, b) => { this.onItemDidUpdate(a, b); }}
                />
              </Fixed>
            </Layout>
          </Fixed>
          <Flex>
            <Canvas
              level={this.getActiveLevel()}
              onItemSelect={(item) => { this.onCanvasItemSelect(item); }}
              onItemModified={(item) => { this.onCanvasItemModified(item); }}
            />
          </Flex>
          <Fixed style={{ width: '15rem', background: '#2980B9' }}>
            <Layout type="column">
              <Flex>
                <LevelInspector
                  level={this.getActiveLevel()}
                  onItemClick={(item) => { this.setActiveItem(item); }}
                />
              </Flex>
              <Flex>
                <LibraryInspector
                  library={this.state.library}
                />
              </Flex>
            </Layout>
          </Fixed>
        </Layout>
      </div>
    );
  }

/*
  render() {
    return (
      <div>
        <h1>Editor</h1>
      </div>
    );
  }
*/
}

Editor.propTypes = {
  library: React.PropTypes.shape({ type: React.PropTypes.oneOf([LibraryObject]) }),
};
