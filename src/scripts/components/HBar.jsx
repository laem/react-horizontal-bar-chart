/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/HBar.css');
require('d3')

var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
});

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },

  render: function() {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height}
        y={this.props.offset} x={0}
        
      />
    );
  }
});

var HBar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 300,
      height: 400,
      data: [ 30, 10, 5, 8, 15, 10, 16, 12, 9 ],
      color: 'turquoise'
    }
  },

  render: function() {
    var props = this.props;

    var xScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.width]);

    var yScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeBands([0, this.props.height], 1/3, 1/2);

    var bars = this.props.data.map(function(point, i) {
      return (
        <Bar  key={i}
              width={xScale(point)} height={yScale.rangeBand()}
              offset={yScale(i)}
              color={props.color}
        />
      )
    });

    return (
      <Chart width={this.props.width} height={this.props.height}>
        <g>{bars}</g>
      </Chart>

    );
  }
});

module.exports = HBar;
