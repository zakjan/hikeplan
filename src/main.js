'use strict';

var _ = require('lodash');
var compression = require('compression');
var express = require('express');
var morgan = require('morgan');
var serveStatic = require('serve-static');


var setupMiddlewares = function(app) {
  app.use(morgan('dev'));
  app.use(compression());
};

var setupRoutes = function(app) {
  app.use('/', serveStatic(__dirname + '/../client/dist'));
};


var app = express();

setupMiddlewares(app);
setupRoutes(app);

app.listen(process.env.PORT || 3000, function() {
  console.info('Express server started');
});
