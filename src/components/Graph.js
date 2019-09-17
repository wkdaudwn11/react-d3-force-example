import React, { Component } from 'react';
import * as d3 from 'd3';
import Links from './Links';
import Nodes from './Nodes';
import Labels from './Labels';
import graph from '../miserables';
import styled from 'styled-components';

const Wrap = styled.div`
  .container {
    background-color: #fff;
    border: 1px solid black;
  }

  .node {
    stroke: none;
    stroke-width: 1.5px;
  }

  .link {
    stroke-opacity: 0.5;
  }

  .label {
    font-size: 10px;
    fill: #ffffff;
    font-weight: bold;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
      height: 600
    };
    this.simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3.forceLink().id(function(d) {
          return d.id;
        })
      )
      .force('charge', d3.forceManyBody().strength(-1500)) // 링크(선)의 길이.
      .force(
        'center',
        d3.forceCenter(this.state.width / 2, this.state.height / 2) // 노드 위치 조절 (가운데)
      )
      .nodes(graph.nodes);

    this.simulation.force('link').links(graph.links);
  }

  componentDidMount() {
    const node = d3.selectAll('.node');
    const link = d3.selectAll('.link');
    const label = d3.selectAll('.label');

    this.simulation.nodes(graph.nodes).on('tick', ticked);

    function ticked() {
      link
        .attr('x1', function(d) {
          return d.source.x;
        })
        .attr('y1', function(d) {
          return d.source.y;
        })
        .attr('x2', function(d) {
          return d.target.x;
        })
        .attr('y2', function(d) {
          return d.target.y;
        });

      node
        .attr('cx', function(d) {
          return d.x;
        })
        .attr('cy', function(d) {
          return d.y;
        });

      label
        .attr('x', function(d) {
          // 라벨 가운데 정렬 코드 시작
          let textLength = 2;
          for (let i = 1; i <= d.name.length; i++) {
            if (i > 2) {
              textLength = textLength + 5;
            } else if (i === 2) {
              textLength = textLength + 4;
            }
          }
          // 라벨 가운데 정렬 코드 끝
          return d.x - textLength; // 라벨의 x좌표
        })
        .attr('y', function(d) {
          return d.y + 3.5; // 라벨의 y좌표
        });
    }
  }

  render() {
    const { width, height } = this.state;
    return (
      <Wrap>
        <svg className='container' width={width} height={height}>
          <Links links={graph.links} colors={graph.colors} />
          <Nodes
            nodes={graph.nodes}
            colors={graph.colors}
            simulation={this.simulation}
          />
          <Labels nodes={graph.nodes} />
        </svg>
      </Wrap>
    );
  }
}
