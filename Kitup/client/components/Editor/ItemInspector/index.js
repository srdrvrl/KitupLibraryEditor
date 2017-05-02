import React from 'react';
import { fabric } from 'fabric';

export default class ItemInspector extends React.Component {

  renderBookshelfInspector() {
    return (
      <div>
        bookshelf inspector
      </div>
    );
  }

  

  renderInspector() {
    if (this.props.item === null) {
      return (
        <h3>No item selected</h3>
      );
    }

    const item = this.props.item;
    const x = item.fabricObject.getLeft();
    const y = item.fabricObject.getTop();
    const w = item.fabricObject.getWidth();
    const h = item.fabricObject.getHeight();
    const sx = item.fabricObject.getScaleX();
    const sy = item.fabricObject.getScaleY();
    const angle = item.fabricObject.getAngle();

    const styles = {
      divf: {
        width: '240px',

      },
      unlist: {
        listStyle:'none',
        padding:0,
        margin:0,

      },

      listitem: {
        display: 'block',
        padding: '1px',
        float: 'right',
        marginBottom: '3px',
        borderRadius: '3px',
      },

    }

    const inspector = (
      <div style={styles.divf}>
        <h3>{item.type}</h3>
        <h6>{item.id}</h6>

        <ul style={styles.unlist}>
          <li style={styles.listitem}>
          X:
          <input type="number" value={x} onChange={(e) => { this.props.onItemChange('x', e.target.value); }} />
          </li>

          <li style={styles.listitem}>
          Y:
          <input type="number" value={y} onChange={(e) => { this.props.onItemChange('y', e.target.value); }} />
          </li>

          <li style={styles.listitem}>
          Width:
          <input type="number" value={w} onChange={(e) => { this.props.onItemChange('w', e.target.value); }} />
          </li>

          <li style={styles.listitem}>
          Height:
          <input type="number" value={h} onChange={(e) => { this.props.onItemChange('h', e.target.value); }} />
          </li>

          <li style={styles.listitem}>
          Scale X:
          <input type="number" value={sx} onChange={(e) => { this.props.onItemChange('sx', e.target.value); }} />
          </li>

          <li style={styles.listitem}>
          Scale Y:
          <input type="number" value={sy} onChange={(e) => { this.props.onItemChange('sy', e.target.value); }} />
          </li>

          <li style={styles.listitem}>
          Angle:
          <input type="number" value={angle} onChange={(e) => { this.props.onItemChange('a', e.target.value); }} />
          </li>
        </ul>
        </div>

    );

    let extraInspector = null;
    if (this.props.item.type === 'bookshelf') {
      extraInspector = this.renderBookshelfInspector();
    }

    return (
      <div>
        {inspector}
        {extraInspector}
      </div>
    );
  }

  render() {

    const div1 = {
      float: 'left',

    }
    return (
      <div style={div1}>
        <h1>Item Inspector</h1>
        {this.renderInspector()}
      </div>
    );
  }
}

ItemInspector.propTypes = {
  onItemChange: React.PropTypes.func,
  item: React.PropTypes.any,
};
