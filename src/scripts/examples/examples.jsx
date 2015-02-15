/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
//var RouteHandler = require('react-router').RouteHandler;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var faker = require('faker')

var HBar = require('../components/HBar.jsx')
var frmttr = require('frmttr')
var formatter = function (value){
  return frmttr()(value).regular
}

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/examples.css');


var imageURL = require('../../images/yeoman.png');

var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var Gist = require('react-gist');

require('../../styles/bootstrap.min.css');

var App = React.createClass({
  render: function() {
    return (
      <div className='main examples'>
        <Grid>
          <Row>
            <Col xs={9} md={9}>
              <div className="example1">
                <h1>Default</h1>
                <HBar data={randomData()} />
              </div>
              <Gist id='7b03b1d4ebf37e389481' />
            </Col>
          </Row>
          <br/><br/><br/><br/><br/><br/>
          <Row>
            <Col xs={6} md={6}>
              <div className="example2">
                <h1>With options</h1>
                <HBar
                      data={randomData(9, 10000, true)}
                      width="230"
                      height="300"
                      focus="3"
                      textPosition="dynamic"
                      axis="false"
                      sort="descending"
                      formatter={formatter}
                />
              </div>
              <Gist id='7bbcc65533bdabede557' />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

function randomData(N, max, long){
  return (
  Array.apply(null, Array(N || 5))
    .map(function(v){
      return {
        v: Math.floor(Math.random() * (max || 20)) + 1,
        label: long ? faker.name.findName() : faker.name.firstName()
      }
    })
  )
}

module.exports = App;
