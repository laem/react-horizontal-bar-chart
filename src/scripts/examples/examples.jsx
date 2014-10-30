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
        v: Math.floor(Math.random() * 20),
        label: faker.name.findName()
      }
    })
  )
}

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/examples.css');


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
                <h2>Simple example</h2>
                <HBar data={randomData()}/>
              </div>
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
                <h2>With options</h2>
                <HBar
                      data={randomData(5)}
                      width="600"
                      height="400"
                      focus="2"
                      axis="true"
                />
              </div>
              <pre>
                {[
                  '<HBar',
                  '   data={randomData(5)}',
                  '   width="600"',
                  '   height="400"',
                  '   focus="2 //have the 2nd bar focused',
                  '   axis="true"',
                  '/>'
                ].join('\n')
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
