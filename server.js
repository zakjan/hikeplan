'use strict';

var express = require('express');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var querystring = require('querystring');
var request = require('request');
var serveStatic = require('serve-static');
var url = require('url');


var setupMiddlewares = function(app) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development'); {
    app.use(morgan('dev'));
  }
};

var setupRoutes = function(app) {
  var staticRoot = path.join(process.cwd(), 'build');

  app.get('/', function(req, res) {
    res.sendFile(path.join(staticRoot, 'index.html'));
  });
  app.use('/', serveStatic(staticRoot));
};

var setupApiProxy = function(app) {
  app.use('/route', function(req, res) {
    var apiUrl = 'http://www.yournavigation.org/api/1.0/gosmore.php?' + querystring.stringify(req.query);
    req.pipe(request(apiUrl)).pipe(res);
  });
}


var setup = function() {
  var app = express();
  var httpServer = http.createServer(app);

  setupMiddlewares(app);
  setupRoutes(app);
  setupApiProxy(app);

  app.listen(process.env.PORT || 3000, function() {
    console.info('Express server started');
  });
}


setup();
