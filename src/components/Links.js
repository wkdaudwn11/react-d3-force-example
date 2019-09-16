import React, { Component } from 'react';
import * as d3 from 'd3';

class Link extends Component {
  componentDidMount() {
    d3.select(this.ref).data([this.props.link]);
  }

  render() {
    return (
      <line
        className='link'
        ref={ref => (this.ref = ref)}
        strokeWidth={Math.sqrt(this.props.link.value)}
      />
    );
  }
}

export default class Links extends Component {
  render() {
    const links = this.props.links.map((link, index) => {
      return <Link key={index} link={link} />;
    });

    return <g className='links'>{links}</g>;
  }
}
