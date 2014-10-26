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
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height}
        y={this.props.offset} x={0}
        onMouseOver={this.props.over.bind(this, this.props.index, this.props.point)}
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
      data: [ 30, 10, 5, 8, 15, 10, 16, 12, 9 ],
      color: 'turquoise'
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
              index={i}
              point={point}
              width={hbar.xScale(point)} height={hbar.yScale.rangeBand()}
              offset={hbar.yScale(i)}
              color={props.color}
              over={hbar.over}
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
    var x = this.xScale(this.state.tips.point)
    return (
      <g className="tips">
        <text className="value"
              y={this.yScale(this.state.tips.i) + this.yScale.rangeBand() / 2}
              x={x - 35}>{this.state.tips.point}</text>
        <text className="label" x={x + 10}></text>
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
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.width]);

    this.yScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeBands([0, this.props.height], 1/3, 1/2);
  }


});

module.exports = HBar;
