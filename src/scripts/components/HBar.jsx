/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
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
        key={this.props.key}
        className={this.props.focused ? 'focused' : ''}
        width={this.props.width} height={this.props.height}
        y={this.props.offset} x={this.props.x}
        onMouseOver={this.props.over}
        onMouseOut={this.props.out}
      />
    );
  }
});

var HBar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 800,
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

    //Save space for labels before the chart
    this.xBase = this.props.textPosition === 'dynamic' ? 0 : this.props.width / 3

    hbar.scales()

    var data = this.props.data

    if (this.props.sort === 'ascending') data.sort(function(p, q){return p.v - q.v});
    if (this.props.sort === 'descending') data.sort(function(p, q){return q.v - p.v});

    /*
    <g>
      {bars}
    </g>
    {this.props.data.map(x => <li key={x.v}>{x.label}</li>)}
    */

    return (
      <svg className="HBar" width={this.props.width} height={this.props.height}>
        <ReactCSSTransitionGroup transitionName="barTransition" component="g">
          {data.map((point, i) =>
              <Bar  key={point.label + i}
                    width={hbar.xScale(point.v)} height={hbar.yScale.rangeBand()}
                    x={hbar.xBase}
                    offset={hbar.yScale(i)}
                    over={hbar.over.bind(hbar, i)}
                    out={hbar.out}
                    focused={hbar.state.hovered == i || hbar.props.focus - 1 == i}
              />
          )}
        </ReactCSSTransitionGroup>
        <line className="axis"
              x1={this.xBase} y1="0" x2={this.xBase} y2={this.yScale.rangeExtent()[1]}
              style={{
                strokeWidth: (this.props.width * 0.002) + 'px',
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
      texts.push(this.drawText(i, this.props.data[i], 'hover'))
    }

    return (
      <ReactCSSTransitionGroup transitionName="barTransition" component="g">
        {texts}
      </ReactCSSTransitionGroup>
    )

  },

  drawText: function(i, point, type){

    var v = point.v

    /* Format the point if an input formatting function is available */
    if (this.props.formatter){
      v = this.props.formatter(v)
    }

    var x = this.xScale(point.v) + this.xBase,
        y = this.yScale(i) + this.yScale.rangeBand() / 2,
        style = {fontSize: this.yScale.rangeBand() * 0.6 + 'px'},
        margin = this.props.width * 0.03,
        className = `texts ${type || ''}`

    if (this.props.textPosition === 'dynamic'){
      var wide = x > this.props.width / 2 //the bar is wide, the point label will go inside

      return (
        <g key={point.label + i} className={className} style={style}>
          <text className="inside"
                y={y}
                x={x - margin}
                textAnchor="end" >

            {wide ? point.label : ''}
          </text>
          <text className="right"
                y={y}
                x={x + margin}
                textAnchor="start" >
            {wide ? v : point.label + ', ' + v}
          </text>
        </g>
      )
    } else {
      return (
        <g key={point.label + i} className={className} style={style}>
          <text className="left"
                y={y}
                x={this.xBase - margin}
                textAnchor="end" >

            {point.label}
          </text>
          <text className="right"
                y={y}
                x={x + margin}
                textAnchor="start" >
            {v}
          </text>
        </g>
      )

    }


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
      // leave some space in the container to display bar values
      .range([0, (w - this.xBase) * 0.8]);

    this.yScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeBands([0, this.props.height], 1/3, 1/2);
  }


});

module.exports = HBar;
