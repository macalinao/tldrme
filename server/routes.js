/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var JsTeaser = require('teaser');
var tease = function(title, text) {
  return (new JsTeaser({
    title: title,
    text: text
  }));
};

module.exports = function(app) {
  app.post('/tease', function(req, res) {
    res.send(tease(req.body.title, req.body.text));
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
