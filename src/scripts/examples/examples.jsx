/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var {DefaultRoute, Route, Routes, Link} = require('react-router');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var faker = require('faker')

var HBar = require('../components/HBar.jsx')

function randomData(N){
  return (
  Array.apply(null, Array(N || 9))
    .map(function(v){
      return {
        v: Math.floor(Math.random() * 20) + 1,
        label: faker.name.findName()
      }
    })
  )
}

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/examples.css');
require('../../styles/example2.css');


var imageURL = require('../../images/yeoman.png');

var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

require('../../styles/bootstrap.min.css');

var App = React.createClass({
  render: function() {

    var code = (function () {/*
<HBar
    data={randomData(5)}
    width="600"
    height="400"
    focus="1"
    axis="true"
    sort="descending"
/>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    var css = (function () {/*
.HBar rect {
  fill: #4D386C
}

.HBar .inside {
  fill: white
}

.HBar .outside {
  fill: white
}

.HBar .axis {
  stroke: #4D386C;
}

.HBar .focused {
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 1px
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    return (
      <div className='main examples'>
        <Grid>
          <Row>
            <Col xs={9} md={5}>
              <div className="example1">
                <h1>Simple example</h1>
                <HBar data={randomData()}/>
              </div>
              <h4>JSX code </h4>
              <pre>
                {[
                  '<HBar',
                  '   data={randomData()}',
                  '/>'
                ].join('\n')
                }
              </pre>
            </Col>
            <Col xs={9} md={7}>
              <div className="example2">
                <h1>With options</h1>
                <HBar
                      data={randomData(5)}
                      width="600"
                      height="400"
                      focus="1"
                      axis="true"
                      sort="descending"
                />
              </div>
              <h4>JSX code </h4>
              <pre>
                {code}
              </pre>
              <h4>CSS</h4>
              <pre>
                {css}
              </pre>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = App;
