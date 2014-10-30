/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/HBar.css');
require('d3')

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
      <rect
        width={this.props.width} height={this.props.height}
        y={this.props.offset} x={0}
        onMouseOver={this.props.over}
        onMouseOut={this.props.out}
      />
    );
  }
});

var HBar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 300,
      height: 400,
      data: [
        {v: 30, label: 'Bonjour'},
        {v: 10, label: 'Mon'},
        {v: 5, label: 'Ami'}
      ]
    }
  },

  getInitialState: function(){
    return {
      tips: {
        hidden: true
      }
    }
  },

  render: function() {
    var props = this.props;
    var hbar = this


    hbar.scales()

    var bars = this.props.data.map(function(point, i) {
      return (
        <Bar  key={i}
              width={hbar.xScale(point.v)} height={hbar.yScale.rangeBand()}
              offset={hbar.yScale(i)}
              over={hbar.over.bind(hbar, i, point)}
              out={hbar.out}
        />
      )
    });

    return (
      <svg className="HBar" width={this.props.width} height={this.props.height}>
        <g>{bars}</g>
        {this.drawTips()}
      </svg>

    );
  },

  drawTips: function(){
    if (this.state.tips.hidden) return;

    var point = this.state.tips.point,
        i = this.state.tips.i;

    var x = this.xScale(point.v),
        y = this.yScale(i) + this.yScale.rangeBand() / 2

    var wide = x > this.props.width / 2 //the bar is wide, the point label will go inside

    return (
      <g className="tips">
        <text className="inside"
              y={y}
              x={x - 8}
              textAnchor="end"
        >
          {wide ? point.label : ''}
        </text>
        <text className="outside"
              y={y}
              x={x + 8}
              textAnchor="start"
        >
          {wide ? point.v : point.label + ', ' + point.v}
        </text>
      </g>
    )
  },

  over: function(i, p){
    this.setState({
      tips: {
        hidden: false,
        i: i,
        point: p
      }
    })
  },

  out: function(){
    this.setState({
      tips: {
        hidden: true
      }
    })
  },

  scales: function(){
    this.xScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data, function(p){return p.v})])
      .range([0, this.props.width]);

    this.yScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeBands([0, this.props.height], 1/3, 1/2);
  }


});

module.exports = HBar;
