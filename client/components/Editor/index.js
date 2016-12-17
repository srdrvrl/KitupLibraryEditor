import React from 'react';
import ObjectLibrary from './ObjectLibrary';
import Canvas from './Canvas';
import Inspector from './Inspector';

export default class Editor extends React.Component {
  render() {
    return (
      <div>
        <ObjectLibrary />
        <Canvas />
        <Inspector />
      </div>
    );
  }
}
