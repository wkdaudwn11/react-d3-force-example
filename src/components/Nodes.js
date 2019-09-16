import React, { Component } from 'react';
import * as d3 from 'd3';

class Node extends Component {
  componentDidMount() {
    d3.select(this.ref).data([this.props.node]);
  }

  render() {
    return (
      <circle
        className='node'
        r={30}
        fill={this.props.color}
        ref={ref => (this.ref = ref)}
      >
        <title>{this.props.node.id}</title>
      </circle>
    );
  }
}

export default class Nodes extends Component {
  componentDidMount() {
    const simulation = this.props.simulation;
    d3.selectAll('.node').call(
      d3
        .drag()
        .on('start', onDragStart)
        .on('drag', onDrag)
        .on('end', onDragEnd)
    );

    function onDragStart(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function onDrag(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function onDragEnd(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    const color = d3.scaleOrdinal(d3.schemeCategory20);
    const nodes = this.props.nodes.map((node, index) => {
      return (
        <Node key={index} node={node} color={color(node.group.toString())} />
      );
    });

    return <g className='nodes'>{nodes}</g>;
  }
}
