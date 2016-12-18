import React from 'react';
import {Layout, Flex, Fixed} from 'react-layout-pane';
import ObjectLibrary from './ObjectLibrary';
import Canvas from './Canvas';
import Inspector from './Inspector';

export default class Editor extends React.Component {
  render() {
    return (
      <div>
        <Layout type="row">
          <Fixed style={{ width: '15rem', background: '#2980B9' }}>
            <ObjectLibrary />
          </Fixed>
          <Flex>
            <Canvas />
          </Flex>
          <Fixed style={{ width: '15rem', background: '#2980B9' }}>
            <Inspector />
          </Fixed>
        </Layout>
      </div>
    );
  }
}
