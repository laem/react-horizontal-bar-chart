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
        className={this.props.focused ? 'focused' : ''}
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
      width: 500,
      height: 400,
      data: [
        {v: 30, label: 'Salut'},
        {v: 10, label: 'Mon'},
        {v: 5, label: 'Pote'}
      ]
    }
  },

  getInitialState: function(){
    return {
      hovered: null
    }
  },

  render: function() {
    var props = this.props;
    var hbar = this


    hbar.scales()

    var data = this.props.data;

    if (this.props.sort === 'ascending') data.sort(function(p, q){return p.v - q.v});
    if (this.props.sort === 'descending') data.sort(function(p, q){return q.v - p.v});

    var bars = data.map(function(point, i) {
      return (
        <Bar  key={i}
              width={hbar.xScale(point.v)} height={hbar.yScale.rangeBand()}
              offset={hbar.yScale(i)}
              over={hbar.over.bind(hbar, i)}
              out={hbar.out}
              focused={hbar.state.hovered == i || hbar.props.focus - 1 == i}
        />
      )
    });

    return (
      <svg className="HBar" width={this.props.width} height={this.props.height}>
        <g>{bars}</g>
        <line className="axis"
              x1="0" y1="0" x2="0" y2={this.yScale.rangeExtent()[1]}
              style={{
                strokeWidth: (this.props.width * 0.005) + 'px',
                visibility: this.props.axis === 'false' ? 'hidden' : 'visible'
              }}
        />
      {this.drawTexts()}
      </svg>

    );
  },

  drawTexts: function(){
    var _this = this;
    var texts = [];
    // One specific bar should have its label and value
    if (this.props.focus != undefined){
      var i = +this.props.focus - 1
      texts.push(this.drawText(i, this.props.data[i]))
    } else { // All bars should have texts
      texts = texts.concat(this.props.data.map(function(point, i){
        return _this.drawText(i, point)
      }))
    }

    if (this.state.hovered != undefined){
      var i = +this.state.hovered
      texts.push(this.drawText(i, this.props.data[i]))
    }

    return (
      <g >
        {texts}
      </g>
    )

  },

  drawText: function(i, point){

    var v = point.v

    /* Format the point if an input formatting function is available */
    if (this.props.formatter){
      v = this.props.formatter(v)
    }

    var x = this.xScale(point.v),
        y = this.yScale(i) + this.yScale.rangeBand() / 2

    var wide = x > this.props.width / 2 //the bar is wide, the point label will go inside

    var margin = this.props.width * 0.03
    var style = {fontSize: this.yScale.rangeBand() * 0.6 + 'px'}

    return (
      <g className="focus" style={style}>
        <text className="inside"
              y={y}
              x={x - margin}
              textAnchor="end" >

          {wide ? point.label : ''}
        </text>
        <text className="outside"
              y={y}
              x={x + margin}
              textAnchor="start" >
          {wide ? v : point.label + ', ' + v}
        </text>
      </g>
    )
  },

  over: function(i){
    this.setState({
      hovered: i
    })
  },

  out: function(){
    this.setState({
      hovered: null
    })
  },

  scales: function(){
    var w = this.props.width
    this.xScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data, function(p){return p.v})])
      // leave some space in the container to displat bar values
      .range([0, w * 0.8]);

    this.yScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeBands([0, this.props.height], 1/3, 1/2);
  }


});

module.exports = HBar;
