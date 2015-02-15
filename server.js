'use strict';

var _ = require('lodash');
var compression = require('compression');
var express = require('express');
var herokuSelfPing = require('heroku-self-ping');
var morgan = require('morgan');
var path = require('path');
var serveStatic = require('serve-static');
var url = require('url');

var routing = require('./routing');



var setupMiddlewares = function(app) {
  app.use(morgan('dev'));
  app.use(compression());
};

var setupRoutes = function(app) {
  var staticRoot = path.join(process.cwd(), process.env.NODE_ENV == 'production' ? 'dist' : 'build');

  app.get('/routing', routing.getRouting);
  app.use('/', serveStatic(staticRoot));
};

var app = express();

setupMiddlewares(app);
setupRoutes(app);

app.listen(process.env.PORT || 3000, function() {
  console.info('Express server started');
});


herokuSelfPing(process.env.BASE_URL);
