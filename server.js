'use strict';

var _ = require('lodash');
var express = require('express');
var herokuSelfPing = require('heroku-self-ping');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var Q = require('q');
var querystring = require('querystring');
var request = require('request');
var serveStatic = require('serve-static');
var url = require('url');

var routing = require('./routing');



var setup = function() {
  var setupMiddlewares = function(app) {
    app.use(morgan('dev'));
  };

  var setupRoutes = function(app) {
    var staticRoot = path.join(process.cwd(), process.env.NODE_ENV == 'production' ? 'dist' : 'build');

    app.get('/routing', routing.getRouting);
    app.use('/', serveStatic(staticRoot));
  };

  var app = express();
  var httpServer = http.createServer(app);

  setupMiddlewares(app);
  setupRoutes(app);

  app.listen(process.env.PORT || 3000, function() {
    console.info('Express server started');
  });
};


setup();
herokuSelfPing(process.env.BASE_URL);
