/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var JsTeaser = require('teaser');

module.exports = function(app) {
  app.post('/tease', function(req, res) {
    res.send((new JsTeaser({
      title: req.body.title,
      text: req.body.text
    })).summarize().join(' '));
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
