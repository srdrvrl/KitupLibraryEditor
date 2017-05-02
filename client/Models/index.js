import uuidv4 from 'uuid/v4';
import { fabric } from 'fabric';

export class LibraryObject {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.levels = [
      new LibraryLevel(),
    ];

    this.setActiveLevel(this.levels[0]);
  }

  addLevel() {
    const level = new LibraryLevel(this.levels.length);
    this.levels.push(level);
    this.setActiveLevel(level);
  }

  removeLevel(level) {
    this.levels = this.levels.filter(item => item !== level);
    this.setActiveLevel(this.levels[0]);
  }

  setActiveLevel(newLevel) {
    for (let level of this.levels) {
      level.setActive(level === newLevel);
    }
  }

  getActiveLevel() {
    let activeLevel = null;
    for (let level of this.levels) {
      if (level.isActive) {
        activeLevel = level;
      }
    }
    return activeLevel;
  }
}

export class LibraryLevel {
  constructor(level) {
    this.id = uuidv4();
    this.level = level || 0;
    this.items = [];
    this.isActive = false;
    this.fabricData = {};
  }

  addItem(item) {
    this.items.push(item);
    this.setActiveItem(item);
  }

  setActive(active) {
    this.isActive = active;

    if (active && this.items.length > 0) {
      // make first item active
      this.items[0].setActive(true);
    } else {
      // set all objects deactive
      this.items.map(item => item.setActive(false));
    }
  }

  setActiveItem(newItem) {
    for (let item of this.items) {
      item.setActive(false);
      if (newItem && (item.id === newItem.id)) {
        item.setActive(true);
      }
    }
  }

  getActiveItem() {
    let activeItem = null;
    for (let item of this.items) {
      if (item.isActive === true) {
        activeItem = item;
      }
    }
    return activeItem;
  }

  updateActiveItem(newItem) {
    const item = this.getActiveItem();
    this.items[this.items.indexOf(item)] = newItem;
  }
}
function deneme() {


  var id = prompt("Please enter id:");
  return id;
}
function deneme2() {


  var id = prompt("Please enter id:");
  return id;
}

export class books{
  constructor(type){
    this.type = type;
    this.id = deneme();
    this.name = deneme2();
  }

}


export class LibraryItem {
  constructor(type) {
    this.type = type;
    this.id = deneme();
    this.isActive = false;
    this.fabricObject = new fabric.Rect({
      width: 10,
      height: 10,
      top: 10,
      left: 10,
      fill: 'yellow',
    });
    this.fabricObject.id = this.id;
  }


  setActive(active) {
    this.isActive = active;
    this.fabricObject.active = active;
  }
}

export class Bookshelf extends LibraryItem {
  constructor() {
    super('bookshelf');
    this.shelves = [];
  }

  getLevelCount() {
    let levelCount = 0;
    for (let shelf of this.shelves) {
      if (shelf.level > levelCount) {
        levelCount = shelf.count;
      }
    }
    return levelCount;
  }
}

export class Shelf {
  constructor() {
    this.bookcode = '';
    this.level = 0;
    this.startIndex = 0;
    this.endIndex = 0;
  }
}

export class Wall extends LibraryItem {
  constructor() {
    super('wall');
  }
}

export class Door extends LibraryItem {
  constructor() {
    super('door');
  }
}
