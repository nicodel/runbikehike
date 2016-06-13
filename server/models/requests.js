/* jshint strict: true, node: true */
'use strict';
var cozydb = require('cozydb');

module.exports = {
  preferences: {
    all: cozydb.defaultRequests.all
  },
  messages: {
    all: cozydb.defaultRequests.all
  }
};
