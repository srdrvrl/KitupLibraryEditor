import React from 'react';
import Parse from 'parse';

// import { Layout, Flex, Fixed } from 'react-layout-pane';
import { LibraryObject, LibraryLevel, Bookshelf, Door, Wall } from '../../Models';

import LibraryInspector from './LibraryInspector';
import LevelInspector from './LevelInspector';
import ItemLibrary from './ItemLibrary';
import ItemInspector from './ItemInspector';
import Canvas from './Canvas';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      library: props.id === null ? new LibraryObject() : null,
      itemLibrary: [],
    };
  }

  componentDidMount() {
    this.fetchItemLibrary();
    if (this.props.id !== null) {
      this.fetchLibrary(
        this.props.id,
        (response) => {
          const fileUrl = response.get('data').url();
          // TODO: get file
          this.setState({
            library: libraryJson,
          });
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }

  // Requests

  // Fetches all Parse.LibraryItem objects
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

  // Saves current state of editor to either a new library or currently editing one.
  saveLibrary() {
    const json = JSON.stringify(this.state.library);
    const base64 = new Buffer(json).toString('base64');
    const file = new Parse.File('data.json', { base64 });
    file.save().then(
      () => {
        const libraryId = this.state.id;
        if (libraryId) { // update
          this.fetchLibrary(
            libraryId,
            (library) => {
              library.set('data', file);
              library.save();
            },
            (error) => {
              console.log(error);
            });
        } else { // add new
          const ParseLibrary = Parse.Object.extend('Library');
          const library = new ParseLibrary();
          library.set('data', file);
          library.set('name', library.name || 'library');
          library.set('owner', Parse.User.current());
          library.save().then(
            (response) => {
              this.setState({
                id: response.id,
              });
            },
            (error) => {
              console.log(error);
            });
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }

  // Fetches Parse.Library object by object id
  fetchLibrary(id, onSuccess, onFailure) {
    const parseLibrary = Parse.Object.extend('Library');
    const query = new Parse.Query(parseLibrary);
    query.equalTo('objectId', id);
    query.first().then(
      (response) => {
        onSuccess(response);
      },
      (error) => {
        onFailure(error);
      },
    );
  }

  // Level

  getActiveLevel() {
    return this.state.library.getActiveLevel();
  }

  setActiveLevel(level) {
    const library = this.state.library;
    library.setActiveLevel(level);
    this.setState({
      library,
    });
  }

  removeActiveLevel() {
    const library = this.state.library;
    if (library.levels.length <= 1) {
      return;
    }

    const activeLevel = library.getActiveLevel();
    library.removeLevel(activeLevel);
    this.setState({
      library,
    });
  }

  addLevel() {
    const library = this.state.library;
    library.addLevel();
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
    console.log('before');
    console.log(item.fabricObject);
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
    console.log('after');
    console.log(item.fabricObject);
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
  /*
  render() {
    console.log(this.state.library);

    if (this.state.library == null) {
      return (
        <div>
          <p>Loading..</p>
        </div>
      );
    }

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
                  onLevelClick={(level) => { this.setActiveLevel(level); }}
                  onLevelRemove={() => { this.removeActiveLevel(); }}
                  onLevelCreate={() => { this.addLevel(); }}
                  onSave={() => { this.saveLibrary(); }}
                />
              </Flex>
            </Layout>
          </Fixed>
        </Layout>
      </div>
    );
  }
  */

  render() {
    return (
      <div>
        <h1>Editor</h1>
      </div>
    );
  }
}

Editor.propTypes = {
  id: React.PropTypes.string,
};
