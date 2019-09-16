import React, { Component } from 'react';
import * as d3 from 'd3';

class Label extends Component {
  componentDidMount() {
    d3.select(this.ref).data([this.props.node]);
  }

  render() {
    return (
      <text className='label' ref={ref => (this.ref = ref)}>
        {this.props.node.name}
      </text>
    );
  }
}

export default class Labels extends Component {
  render() {
    const labels = this.props.nodes.map((node, index) => {
      return <Label key={index} node={node} />;
    });

    return <g className='labels'>{labels}</g>;
  }
}
