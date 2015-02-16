'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var Request = Promise.promisify(require('browser-request'));


var MapRouting = {
  route: function(waypoints, callback, context, options) {
    context = context || callback;

    var reqData = {
      url: '/routing',
      qs: {
        waypoints: waypoints.map(x => '' + x.latLng.lat + ',' + x.latLng.lng).join(';'),
      },
      json: true,
    };

    Request(reqData).spread(function(res, body) {
      var coordinates = _.flatten(body.segments.map(x => x.coordinates), true).map(x => [x[1], x[0]]);

      var route = {
        // required by leaflet-routing-machine
        name: 'Route',
        coordinates: coordinates,
        instructions: [],
        inputWaypoints: waypoints,
        summary: {},
        // custom
        segments: body.segments,
        total: body.total,
      };

      callback.call(context, null, [route]);
    }).catch(function(body) {
      callback.call(context, body);
    });
  },
};


module.exports = MapRouting;
