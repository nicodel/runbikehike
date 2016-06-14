/* jshint strict: true, node: true */
'use strict';

var dashboard = require('./dashboard');
var messages = require('./messages');
var sessions = require('./sessions');
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
  'sessions': {
    get: sessions.getAll,
    post: sessions.add
  },
  'sessions/:id': {
    get: sessions.getOne,
    put: sessions.update,
    delete: sessions.remove
  },
  'preferences': {
    get: preferences.getAll,
    put: preferences.update
  }
};
