'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

var request = require('./request');


var routingBaseUrl = 'http://www.yournavigation.org/api/1.0/gosmore.php';
var waypointRegex = /^(\-?\d+\.?\d*),(\-?\d+\.?\d*)$/


var parseWaypoints = function(waypoints) {
  if (!(waypoints && _.isString(waypoints))) {
    return;
  }

  waypoints = waypoints.split(/;/);

  if (!(waypoints && _.isArray(waypoints) && waypoints.length >= 2 &&
    _.every(waypoints, function(x) { return x.match(waypointRegex); }))) {
    return;
  }

  return waypoints.map(function(x) { return x.split(/,/); });
};

var parseRoutingResult = function(body) {
  return {
    coordinates: body.coordinates,
    distance: parseFloat(parseFloat(body.properties.distance).toFixed(3)),
  };
};

var computeTotal = function(routes) {
  var distances = routes.map(function(x) { return x.distance; });

  var distance = _.reduce(distances, function(sum, num) { return sum + num; }, 0);
  distance = parseFloat(distance.toFixed(3));

  return {
    distance: distance,
  }
};

var getRouting = function(req, res) {
  var waypoints = parseWaypoints(req.query.waypoints);

  if (!waypoints) {
    res.status(422).send({ error: 'Waypoints are in wrong format.' });
  }

  var promises = _.range(0, waypoints.length - 1).map(function(i) {
    var reqData = {
      url: routingBaseUrl,
      qs: {
        format: 'geojson',
        v: 'foot',
        fast: 0,
        layer: 'mapnik',
        flat: waypoints[i][0],
        flon: waypoints[i][1],
        tlat: waypoints[i + 1][0],
        tlon: waypoints[i + 1][1],
      },
      json: true,
    };

    return request(reqData);
  });

  Promise.all(promises).then(function(results) {
    var segments = results.map(function(x) {
      return parseRoutingResult(x.body);
    });
    var total = computeTotal(segments);

    var resData = {
      segments: segments,
      total: total,
    };

    res.send(resData);
  }).catch(function(results) {
    res.status(500).send({ error: 'Error while retrieving route.'});
  });
};


exports.getRouting = getRouting;
