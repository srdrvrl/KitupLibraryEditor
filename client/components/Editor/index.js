import React from 'react';
import { Layout, Flex, Fixed } from 'react-layout-pane';
import ObjectLibrary from './ObjectLibrary';
import Canvas from './Canvas';
import Inspector from './Inspector';

export default class Editor extends React.Component {

  onSave() {
    console.log('save pressed');
  }

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
            <Layout type="column">
              <Flex>
                <Inspector />
              </Flex>
              <Fixed style={{ height: '8rem' }}>
                <div>
                  <h1>Project</h1>
                  <ul>
                    <li key="save">
                      <button onPress={this.onSave}>Save</button>
                    </li>
                  </ul>
                </div>
              </Fixed>
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
