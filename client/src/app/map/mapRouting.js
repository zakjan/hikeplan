'use strict';

var _ = require('lodash');

var request = require('../../common/request');


class MapRouting {
  route(waypoints, callback, context, options) {
    // return empty route for less than 2 waypoints
    if (waypoints.length < 2) {
      callback.call(context, null, []);
      return;
    }

    var reqData = {
      url: '/routing',
      qs: {
        waypoints: waypoints.map(x => x.latLng.lat + ',' + x.latLng.lng).join(';'),
      },
      json: true,
    };

    request(reqData).then(function(res) {
      var body = res.body;
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
    }).catch(function(err) {
      console.error(err);
      callback.call(context, err);
    });
  }
};


module.exports = MapRouting;
