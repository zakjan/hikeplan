'use strict';

var _ = require('lodash');

var Request = require('common/request');

var config = require('config');


class Route {
  static _calculateElevationStats(elevationProfile) {
    var elevations = _.pluck(elevationProfile, 'height');
    var prevElevation = elevations[0];
    var lowestElevation = _.min(elevations);
    var highestElevation = _.max(elevations);
    var ascend = 0;
    var descend = 0;

    for (var i = 1; i < elevations.length; i++) {
      var elevation = elevations[i];
      var elevationDifference = elevation - prevElevation;

      if (elevationDifference > 0) {
        ascend += elevationDifference;
      } else if (elevationDifference < 0) {
        descend -= elevationDifference;
      }

      prevElevation = elevation;
    }

    return { lowestElevation, highestElevation, ascend, descend };
  }

  static _calculateTime({ distance, ascend, descend }) {
    // @see http://www.horskasluzba.cz/data/web/download/casopis-horske-sluzby/casopis-hscr-2-leto2009.pdf
    var DISTANCE_SPEED = 4; // km/h
    var ASCEND_SPEED = 400; // m/h
    var DESCEND_SPEED = 600; // m/h

    var distanceTime = distance / DISTANCE_SPEED;
    var ascendTime = ascend / ASCEND_SPEED;
    var descendTime = descend / DESCEND_SPEED;
    var elevationTime = ascendTime + descendTime;
    var time = Math.max(distanceTime, elevationTime) + Math.min(distanceTime, elevationTime) / 2;

    return time;
  }

  static _calculateStats(elevationProfile) {
    var { lowestElevation, highestElevation, ascend, descend } = Route._calculateElevationStats(elevationProfile);

    var distance = _.last(elevationProfile).distance;
    var time = Route._calculateTime({ distance, ascend, descend });

    return { lowestElevation, highestElevation, ascend, descend, distance, time };
  }

  static getStats(routeSessionId) {
    var reqOptions = {
      url: 'http://open.mapquestapi.com/elevation/v1/profile',
      qs: {
        key: config.mapQuestApiKey,
        sessionId: routeSessionId,
        useFilter: true, // smooth line, fixes missing data
        outShapeFormat: 'none',
      },
      json: true,
    };
    return Request(reqOptions).then((res) => {
      var elevationProfile = res.body.elevationProfile.filter(x => x.height !== -32768); // fixes missing data
      var stats = Route._calculateStats(elevationProfile)

      return { elevationProfile, stats };
    });
  }
}


module.exports = Route;
