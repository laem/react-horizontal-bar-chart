/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var {DefaultRoute, Route, Routes, Link} = require('react-router');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var faker = require('faker')

var HBar = require('./HBar.jsx')

var inputData = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(v){
  return {
    v: Math.floor(Math.random() * 20),
    label: faker.name.findName()
  }
})

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var App = React.createClass({
  render: function() {
    return (
      <div className='main'>
          <HBar data={inputData}/>
      </div>
    );
  }
});

module.exports = App;
