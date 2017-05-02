import React from 'react';
import Editor from '../../components/Editor';

export default class EditorPage extends React.Component {
  render() {
    const id = this.props.params.id || null;
    return (
      <Editor id={id} />
    );
  }
}
