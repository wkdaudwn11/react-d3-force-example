import React, { Component } from 'react';
import * as d3 from 'd3';
import Links from './Links';
import Nodes from './Nodes';
import Labels from './Labels';
import graph from '../miserables';
import styled from 'styled-components';

const Wrap = styled.div`
  /* svg g {
    transform: rotate(45deg);
  } */
  .container {
    background-color: #fff;
  }

  .node {
    stroke: none;
    stroke-width: 1.5px;
  }

  .link {
    stroke-opacity: 0.5;
  }

  .label {
    font-size: 8px;
    fill: #ffffff;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
      height: 600,
      nodeCheck: 0,
      linkWidth: -70
    };
    const nodeCount = graph.nodes.length;
    this.simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3.forceLink().id(function(d) {
          return d.id;
        })
      )
      .force('charge', d3.forceManyBody().strength(this.state.linkWidth)) // 링크(선)의 길이. (componentWillMount에서 값을 다시 구함.)
      .force(
        'center',
        d3.forceCenter(this.state.width / 2, this.state.height / 2) // 노드 위치 조절 (가운데)
      )
      .nodes(graph.nodes);

    this.simulation.force('link').links(graph.links);
  }

  componentWillMount() {
    // 그룹별 노드의 갯수로 link의 길이를 구할 예정.
    // 두 개의 그룹중에서 노드의 갯수가 많은 그룹의 노드갯수를 기준으로 잡는다.
    // 만약 A그룹이 6개, B그룹이 7개면 B그룹의 노드갯수를 기준으로 한다.
    const group_A = graph.nodes.filter(node => node.group === 1).length;
    const group_B = graph.nodes.filter(node => node.group === 2).length;
    let group_length;
    if (group_A > group_B) {
      group_length = group_A;
    } else {
      group_length = group_B;
    }
    const group_weight = group_length * group_length;
    this.setState({
      linkWidth: (this.state.linkWidth - group_weight) * group_length
    });
  }

  componentDidMount() {
    const node = d3.selectAll('.node');
    const link = d3.selectAll('.link');
    const label = d3.selectAll('.label');
    const svg = d3.selectAll('#d3-force');

    let paintCount = 0; // 화면에 그래프를 그리는 횟수를 담는 변수

    this.simulation.nodes(graph.nodes).on('tick', ticked);

    function ticked() {
      paintCount = paintCount + 1; // 그림 횟수 증가
      if (paintCount > 1) {
        // 그래프를 이미 그렸다면 실행종료
        return false;
      }
      // 줌기능 추가
      svg.call(
        d3.zoom().on('zoom', function() {
          var t = d3.event.transform;

          t.x = d3.min([t.x, 0]);
          t.y = d3.min([t.y, 0]);
          t.x = d3.max([t.x, 1]);
          t.y = d3.max([t.y, 1]);

          if (t.k > 1) {
            t.k = 1;
          } else if (t.k < 0.5) {
            t.k = 0.5;
          }

          svg.attr('transform', t);
        })
      );

      link
        .attr('x1', function(d) {
          let result = getCoordinate(d.source, 'x');
          return result;
        })
        .attr('y1', function(d) {
          let result = getCoordinate(d.source, 'y');
          return result;
        })
        .attr('x2', function(d) {
          let result = getCoordinate(d.target, 'x');
          return result;
        })
        .attr('y2', function(d) {
          let result = getCoordinate(d.target, 'y');
          return result;
        });

      node
        .attr('cx', function(d) {
          let result = getCoordinate(d, 'x');
          return result;
        })
        .attr('cy', function(d) {
          let result = getCoordinate(d, 'y');
          return result;
        })
        .attr('r', function(d) {
          return d.size;
        });

      label
        .attr('x', function(d) {
          // 라벨 가운데 정렬 코드 시작
          let textLength = 4;
          for (let i = 1; i <= d.name.length; i++) {
            if (i > 1) {
              textLength = textLength + 3;
            }
          }
          // 라벨 가운데 정렬 코드 끝

          let result = getCoordinate(d, 'x');
          return result - textLength; // 라벨의 x좌표
        })
        .attr('y', function(d) {
          let result = getCoordinate(d, 'y');
          return result + 3; // 라벨의 y좌표
        });
    }

    /** node, label, link의 좌표를 다시 구하는 함수  */
    const getCoordinate = (d, xy) => {
      let result;
      const width = this.state.width / 2;
      if (xy === 'x') {
        result = d.x;
        const A_width = width - 100; // A그룹 부모노드의 기본 x좌표
        const B_width = width + 100; // B그룹 부모노드의 기본 x좌표
        if (d.id === 'A') {
          result = A_width;
        } else if (d.id === 'B') {
          result = B_width;
        } else if (d.id.indexOf('common') !== -1) {
          result = width;
        } else {
          if (d.id.indexOf('A') !== -1) {
            const A_Group = graph.nodes.filter(node => node.group === 1); // A그룹의 노드들
            const A_Count = A_Group.length - 1; // A그룹의 자식노드 갯수 (A그룹 노드 총갯수 - 부모노드)
            const A_CountCenter = Math.floor(A_Count / 2); // 총노드갯수의 가운데값 (6개면 3)
            const linkWidth = Math.abs(this.state.linkWidth) / A_Count; // 링크 선의 길이
            const X_Space = linkWidth / A_Count + 10; // 노드끼리의 X좌표 간격
            const nodeCoordinateArr = new Array(); // 각 노드들의 X좌표를 담는 배열. (인덱스는 groupIndex를 참조)

            for (let i = 0; i <= A_CountCenter; i++) {
              if (i !== A_CountCenter) {
                nodeCoordinateArr[i] = X_Space * (i + 1);
                nodeCoordinateArr[A_Count - 1 - i] = X_Space * (i + 1);
              } else {
                // 가운데 지점일 경우
                if (A_Count % 2 === 0) {
                  // 노드의 갯수가 짝수 일 경우
                  nodeCoordinateArr[i] = X_Space * i;
                  nodeCoordinateArr[A_Count - 1 - i] = X_Space * i;
                } else {
                  // 노드의 갯수가 홀수 일 경우
                  nodeCoordinateArr[i] = X_Space * (i + 1);
                }
              }
            }
            result = A_width - nodeCoordinateArr[d.groupIndex];
          } else {
            // B그룹
            const B_Group = graph.nodes.filter(node => node.group === 2); // B그룹의 노드들
            const B_Count = B_Group.length - 1; // B그룹의 자식노드 갯수 (B그룹 노드 총갯수 - 부모노드)
            const B_CountCenter = Math.floor(B_Count / 2); // 총노드갯수의 가운데값 (6개면 3)
            const linkWidth = Math.abs(this.state.linkWidth) / B_Count; // 링크 선의 길이
            const X_Space = linkWidth / B_Count + 10; // 노드끼리의 X좌표 간격
            const nodeCoordinateArr = new Array(); // 각 노드들의 X좌표를 담는 배열. (인덱스는 groupIndex를 참조)

            for (let i = 0; i <= B_CountCenter; i++) {
              if (i !== B_CountCenter) {
                nodeCoordinateArr[i] = X_Space * (i + 1);
                nodeCoordinateArr[B_Count - 1 - i] = X_Space * (i + 1);
              } else {
                // 가운데 지점일 경우
                if (B_Count % 2 === 0) {
                  // 노드의 갯수가 짝수 일 경우
                  nodeCoordinateArr[i] = X_Space * i;
                  nodeCoordinateArr[B_Count - 1 - i] = X_Space * i;
                } else {
                  // 노드의 갯수가 홀수 일 경우
                  nodeCoordinateArr[i] = X_Space * (i + 1);
                }
              }
            }
            result = B_width + nodeCoordinateArr[d.groupIndex];
          }
        }
      } else {
        result = d.y;
        const height = this.state.height / 2;
        if (d.id === 'A' || d.id === 'B') {
          result = height;
        } else if (d.id.indexOf('common') !== -1) {
          const C_Group = graph.nodes.filter(node => node.group === 0); // 공통 노드들
          const C_Count = C_Group.length; // 공통노드 총갯수
          const C_CountCenter = Math.floor(C_Count / 2); // 총노드갯수의 가운데값 (6개면 3)
          const linkWidth = Math.abs(this.state.linkWidth / C_Count); // 링크 선의 길이
          const Y_Space = linkWidth / C_Count - 3; // 노드끼리의 Y좌표 간격

          if (C_Count === 1) {
            result = height;
          } else if (C_Count === 2) {
            if (d.groupIndex === 0) {
              result = height + Y_Space;
            } else {
              result = height - Y_Space;
            }
          } else {
            // 공통 노드가 3개 이상 일 경우
            const nodeCoordinateArr = new Array(); // 각 노드들의 Y좌표를 담는 배열. (인덱스는 groupIndex를 참조)
            if (C_Count % 2 !== 0) {
              // 공통 노드가 홀수 일 경우
              for (let i = 0; i <= C_Count - 1; i++) {
                const standard_Y = Y_Space * C_CountCenter; // 센터노드로부터 가장 멀리 있는 노드의 Y좌표

                if (i < C_CountCenter) {
                  // 센터노드 이전
                  nodeCoordinateArr[i] =
                    height - standard_Y * (C_CountCenter - i);
                } else if (i === C_CountCenter) {
                  // 센터노드
                  nodeCoordinateArr[i] = height;
                } else {
                  // 센터노드 이후
                  nodeCoordinateArr[i] =
                    height + standard_Y * (i - C_CountCenter);
                }
              }
              result = nodeCoordinateArr[d.groupIndex];
            } else {
              // 짝수 일 경우
              for (let i = 0; i <= C_Count - 1; i++) {
                const standard_Y = Y_Space * C_CountCenter; // 센터노드로부터 가장 멀리 있는 노드의 Y좌표
                const standard_Y2 = standard_Y / 2;

                if (i < C_CountCenter && i < C_CountCenter - 1) {
                  // 센터노드 이전
                  nodeCoordinateArr[i] =
                    height - standard_Y2 * (C_CountCenter - i);
                } else if (i === C_CountCenter || i === C_CountCenter - 1) {
                  // 센터노드
                  if (i === C_CountCenter) {
                    nodeCoordinateArr[i] = height + standard_Y / 2 - 10;
                  } else {
                    nodeCoordinateArr[i] = height - standard_Y / 2 + 10;
                  }
                } else {
                  // 센터노드 이후
                  if (i === C_CountCenter + 1) {
                    nodeCoordinateArr[i] =
                      height + standard_Y * (i - C_CountCenter);
                  } else {
                    nodeCoordinateArr[i] =
                      height + standard_Y2 + standard_Y2 * (i - C_CountCenter);
                  }
                }
              }
              result = nodeCoordinateArr[d.groupIndex];
            }
          }
        } else {
          if (d.id.indexOf('A') !== -1) {
            const A_Group = graph.nodes.filter(node => node.group === 1); // A그룹의 노드들
            const A_Count = A_Group.length - 1; // A그룹의 자식노드 갯수 (A그룹 노드 총갯수 - 부모노드)
            const A_CountCenter = Math.floor(A_Count / 2); // 총노드갯수의 가운데값 (6개면 3)
            const linkWidth = Math.abs(this.state.linkWidth / A_Count); // 링크 선의 길이
            const Y_Space = linkWidth / A_Count - 3; // 노드끼리의 Y좌표 간격

            const nodeCoordinateArr = new Array(); // 각 노드들의 Y좌표를 담는 배열. (인덱스는 groupIndex를 참조)

            // 자식노드의 갯수가 짝수 일 경우
            if (A_Count % 2 === 0) {
              for (let i = 0; i <= A_Count - 1; i++) {
                const standard_Y = Y_Space * A_CountCenter; // 센터노드로부터 가장 멀리 있는 노드의 Y좌표
                const standard_Y2 = standard_Y / 2;

                if (i < A_CountCenter && i < A_CountCenter - 1) {
                  // 센터노드 이전
                  nodeCoordinateArr[i] =
                    height - standard_Y2 * (A_CountCenter - i);
                } else if (i === A_CountCenter || i === A_CountCenter - 1) {
                  // 센터노드
                  if (i === A_CountCenter) {
                    nodeCoordinateArr[i] = height + standard_Y / 2 - 10;
                  } else {
                    nodeCoordinateArr[i] = height - standard_Y / 2 + 10;
                  }
                } else {
                  // 센터노드 이후
                  if (i === A_CountCenter + 1) {
                    nodeCoordinateArr[i] =
                      height + standard_Y * (i - A_CountCenter);
                  } else {
                    nodeCoordinateArr[i] =
                      height + standard_Y2 + standard_Y2 * (i - A_CountCenter);
                  }
                }
              }
              result = nodeCoordinateArr[d.groupIndex];
            } else {
              // 홀수 일 경우
              for (let i = 0; i <= A_Count - 1; i++) {
                const standard_Y = Y_Space * A_CountCenter; // 센터노드로부터 가장 멀리 있는 노드의 Y좌표

                if (i < A_CountCenter) {
                  // 센터노드 이전
                  nodeCoordinateArr[i] =
                    height - standard_Y * (A_CountCenter - i);
                } else if (i === A_CountCenter) {
                  // 센터노드
                  nodeCoordinateArr[i] = height;
                } else {
                  // 센터노드 이후
                  nodeCoordinateArr[i] =
                    height + standard_Y * (i - A_CountCenter);
                }
              }
              result = nodeCoordinateArr[d.groupIndex];
            }
          } else {
            // B그룹
            const B_Group = graph.nodes.filter(node => node.group === 2); // B그룹의 노드들
            const B_Count = B_Group.length - 1; // A그룹의 자식노드 갯수 (B그룹 노드 총갯수 - 부모노드)
            const B_CountCenter = Math.floor(B_Count / 2); // 총노드갯수의 가운데값 (6개면 3)
            const linkWidth = Math.abs(this.state.linkWidth / B_Count); // 링크 선의 길이
            const Y_Space = linkWidth / B_Count - 3; // 노드끼리의 X좌표 간격

            const nodeCoordinateArr = new Array(); // 각 노드들의 Y좌표를 담는 배열. (인덱스는 groupIndex를 참조)

            // 자식노드의 갯수가 짝수 일 경우
            if (B_Count % 2 === 0) {
              for (let i = 0; i <= B_Count - 1; i++) {
                const standard_Y = Y_Space * B_CountCenter; // 센터노드로부터 가장 멀리 있는 노드의 Y좌표
                const standard_Y2 = standard_Y / 2;

                if (i < B_CountCenter && i < B_CountCenter - 1) {
                  // 센터노드 이전
                  nodeCoordinateArr[i] =
                    300 - standard_Y2 * (B_CountCenter - i);
                } else if (i === B_CountCenter || i === B_CountCenter - 1) {
                  // 센터노드
                  if (i === B_CountCenter) {
                    nodeCoordinateArr[i] = 300 + standard_Y / 2 - 10;
                  } else {
                    nodeCoordinateArr[i] = 300 - standard_Y / 2 + 10;
                  }
                } else {
                  // 센터노드 이후
                  if (i === B_CountCenter + 1) {
                    nodeCoordinateArr[i] =
                      300 + standard_Y * (i - B_CountCenter);
                  } else {
                    nodeCoordinateArr[i] =
                      300 + standard_Y2 + standard_Y2 * (i - B_CountCenter);
                  }
                }
              }
              result = nodeCoordinateArr[d.groupIndex];
            } else {
              // 홀수 일 경우
              for (let i = 0; i <= B_Count - 1; i++) {
                const standard_Y = Y_Space * B_CountCenter; // 센터노드로부터 가장 멀리 있는 노드의 Y좌표

                if (i < B_CountCenter) {
                  // 센터노드 이전
                  nodeCoordinateArr[i] = 300 - standard_Y * (B_CountCenter - i);
                } else if (i === B_CountCenter) {
                  // 센터노드
                  nodeCoordinateArr[i] = 300;
                } else {
                  // 센터노드 이후
                  nodeCoordinateArr[i] = 300 + standard_Y * (i - B_CountCenter);
                }
              }
              result = nodeCoordinateArr[d.groupIndex];
            }
          }
        }
      }
      return result;
    };
  }

  render() {
    const { width, height } = this.state;
    return (
      <Wrap>
        <svg id='d3-force' className='container' width={width} height={height}>
          <Links links={graph.links} colors={graph.colors} />
          <Nodes
            nodes={graph.nodes}
            colors={graph.colors}
            simulation={this.simulation}
            nodeCheck={this.state.nodeCheck}
            reRendering={this.reRendering}
          />
          <Labels nodes={graph.nodes} />
        </svg>
      </Wrap>
    );
  }
}
