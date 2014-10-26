/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var {DefaultRoute, Route, Routes, Link} = require('react-router');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var HBar = require('./HBar.jsx')

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var App = React.createClass({
  render: function() {
    return (
      <div className='main'>
          <HBar />
      </div>
    );
  }
});

module.exports = App;
