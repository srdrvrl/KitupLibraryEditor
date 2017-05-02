import React from 'react';
import Parse from 'parse';
import ReactDOM from 'react-dom';


import { LibraryObject, LibraryLevel, Bookshelf, Door, Wall, books } from '../../Models';
import LibraryInspector from './LibraryInspector';
import LevelInspector from './LevelInspector';
import ItemLibrary from './ItemLibrary';
import ItemInspector from './ItemInspector';
import Canvas from './Canvas';


//import { Layout , Flex , Fixed } from 'react-layout-pane';

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
    console.log(json);
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

  render() {

    console.log(this.state.library);

    //css parts
    var imgUrl='http://content.wallpapers-room.com/presentationBig/Blue_by_TheBestIsaac.jpg';
    var imgHome='http://i.hizliresim.com/DP1g7Z.jpg';
    const page = {
      padding:'1px',
      width: '1240px',

      border: '3px dotted #253c93',
      borderRadius: '5px',
      height: '560px',
      float: 'left',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:'1px',
      backgroundImage: 'url(' + imgHome + ') ',





    }
    var imgUrlTexture='http://www.pixeden.com/media/k2/galleries/220/001-wood-melamine-subttle-pattern-background-pat.jpg';
    const map = {

      float: 'left',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:'1px',
      backgroundImage: 'url(' + imgUrlTexture + ')',

    }
    const sag = {
      width:'300px',
      color: 'white',
      backgroundImage: 'url(' + imgUrl + ')',
      float:'right',
      marginRight:'5px',
      marginBottom:'5px',
    };
    const sol = {
      width:'150px',
      backgroundImage: 'url(' + imgUrl + ')',
      color: 'white',
      float:'left',
      marginRight:'5px',
      marginBottom:'5px',
    };
    const sol2 = {
      width:'240px',
      backgroundImage: 'url(' + imgUrl + ')',
      color: 'white',
      float:'left',
      marginRight:'5px',
      marginBottom:'5px',
    };
    const orta = {
      width:'150px',

      float: 'left',
      marginRight:'5px',
      marginBottom:'1px',
    }



    return (

      <div style ={page}>
                <div style = {sol}>
                <ItemLibrary
                  items={this.state.itemLibrary}
                  onItemCreate={(type) => { this.createItem(type); }}
                />
                </div>
                <div style = {sol2}>
                <ItemInspector
                  item={this.getActiveItem()}
                  onItemChange={(a, b) => { this.onItemDidUpdate(a, b); }}
                />
                </div>
                <div style = {orta}>
                  <div style = {map}>
            <Canvas
              level={this.getActiveLevel()}
              onItemSelect={(item) => { this.onCanvasItemSelect(item); }}
              onItemModified={(item) => { this.onCanvasItemModified(item); }}
            />
            </div>
              </div>
                <div style = {sag}>
                <LevelInspector
                  level={this.getActiveLevel()}
                  onItemClick={(item) => { this.setActiveItem(item); }}
                />
                <br />
                <LibraryInspector
                  library={this.state.library}
                  onLevelClick={(level) => { this.setActiveLevel(level); }}
                  onLevelRemove={() => { this.removeActiveLevel(); }}
                  onLevelCreate={() => { this.addLevel(); }}
                  onSave={() => { this.saveLibrary(); }}
                />
              </div>
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
  id: React.PropTypes.string,
};
