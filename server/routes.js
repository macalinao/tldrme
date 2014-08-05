/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var request = require('superagent');
var unfluff = require('unfluff');
var JsTeaser = require('teaser');

module.exports = function(app) {
  app.post('/tease', function(req, res) {
    var url = req.body.url;
    request.get(url)
      .redirects(10)
      .end(function(err, data) {
        var parsed = unfluff(data.text);
        try {
          res.send((new JsTeaser({
            title: parsed.title,
            text: parsed.text
          })).summarize().join(' '));
        } catch (e) {
          res.send('Could not parse that news article. Try another one!');
        }
      });
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
