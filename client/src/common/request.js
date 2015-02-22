'use strict';

var Promise = require('bluebird');
var Request = Promise.promisify(require('browser-request'));


class ResponseError extends Error {
  constructor(res) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = 'Request was unsuccessful.';
    this.res = res;
  }
}

var NewRequest = function (reqData) {
  return Request(reqData).spread(function(res, body) {
    var isError = Math.trunc(res.statusCode / 100) != 2;

    if (isError) {
      throw new ResponseError(res);
    }

    return res;
  });
}


module.exports = NewRequest;
