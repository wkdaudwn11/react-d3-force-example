import React, { Component } from 'react';
import * as d3 from 'd3';
import jQuery from 'jquery';
import { ifError } from 'assert';
window.$ = window.jQuery = jQuery;

class Node extends Component {
  componentDidMount() {
    d3.select(this.ref).data([this.props.node]);
  }

  render() {
    return (
      <rect
        className='node'
        fill={this.props.color}
        ref={ref => (this.ref = ref)}
      >
        <title>{this.props.node.id}</title>
      </rect>
    );
  }
}

export default class Nodes extends Component {
  state = {
    nodes: ''
  };
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
    const nodes = this.props.nodes.map((node, index) => {
      return (
        <Node key={index} node={node} color={this.props.colors[node.group]} />
      );
    });

    return <g className='nodes'>{nodes}</g>;
  }
}
