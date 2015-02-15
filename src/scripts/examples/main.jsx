/** @jsx React.DOM */

var App = require('./examples');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route

var routes = (
  <Route path="/" handler={App} />
)

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
