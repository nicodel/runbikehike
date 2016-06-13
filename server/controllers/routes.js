/* jshint strict: true, node: true */
'use strict';

var dashboard = require('./dashboard');
var messages = require('./messages');
var preferences = require('./preferences');

module.exports = {
  'dashboard': {
    get: dashboard.getAll
  },
  'messages': {
    get: messages.getAll,
    post: messages.add,
  },
  'messages/:id': {
    get: messages.getOne,
    put: messages.add
  },
  'preferences': {
    get: preferences.getAll,
    put: preferences.update
  }
};
