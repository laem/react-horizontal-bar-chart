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
var frmttr = require('frmttr')
var formatter = function (value){
  return frmttr()(value).regular
}

function randomData(N, max){
  return (
  Array.apply(null, Array(N || 9))
    .map(function(v){
      return {
        v: Math.floor(Math.random() * (max || 20)) + 1,
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
                  '   // data is an array of ',
                  '   // {v: 18, label: "Joseph"} objects',
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
                      data={randomData(5, 10000)}
                      width="600"
                      height="400"
                      focus="1"
                      axis="true"
                      sort="descending"
                      formatter={formatter}
                />
              </div>
              <h4>JSX code </h4>
              <pre>
                {
                  '<HBar \n'
                + '      data={randomData(5)} \n'
                + '      width="600" \n'
                + '      height="400" \n'
                + '      focus="1" \n'
                + '      axis="true" \n'
                + '      sort="descending" \n'
                + '      // fn applied to values, should return a string \n'
                + '      formatter={formatter} \n'
                + '/> \n'
                }
              </pre>
              <h4>CSS</h4>
              <pre>
                {
                  ' .HBar rect { \n'
                  + '  fill: #4D386C \n'
                  + '} \n'
                  + ' \n'
                  + ' .HBar .inside { \n'
                  + '  fill: white \n'
                  + '} \n'
                  + ' \n'
                  + ' .HBar .outside { \n'
                  + '  fill: white \n'
                  + '} \n'
                  + ' \n'
                  + ' .HBar .axis { \n'
                  + '  stroke: #4D386C; \n'
                  + '} \n'
                  + ' \n'
                  + ' .HBar .focused { \n'
                  + '  stroke: rgba(255, 255, 255, 0.5); \n'
                  + '  stroke-width: 1px \n'
                  + '} \n'
                }
              </pre>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = App;
