/** @jsx React.DOM */

var App = require('./App');
var React = require('react');
var {DefaultRoute, Route, Routes, Link} = require('react-router');

React.renderComponent((
  <Routes >
    <Route path="/" handler={App}>
    </Route>
  </Routes>
), document.getElementById('content'));
