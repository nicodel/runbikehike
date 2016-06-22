/* jshint strict: true, node: true */
'use strict';

// var dashboard = require('./dashboard');
var messages = require('./messages');
var sessions = require('./sessions');
var bodies = require('./bodies');
var preferences = require('./preferences');

module.exports = {
  'dashboard': {
    get: function () { return null; }
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
  'bodies': {
    get: bodies.getAll,
    post: bodies.add
  },
  'bodies/:id': {
    get: bodies.getOne,
    put: bodies.update,
    delete: bodies.remove
  },
  'preferences': {
    get: preferences.getAll,
    put: preferences.update
  }
};
