/* jshint strict: true, node: true */
'use strict';

// var dashboard = require('./dashboard');
var messages = require('./messages');
var sessions = require('./sessions');
var gps_tracks = require('./gps_tracks');
var body_weight = require('./body_weight');
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
  'gps_tracks': {
    get: gps_tracks.getAll,
    post: gps_tracks.add
  },
  'gps_tracks/:id': {
    get: gps_tracks.getOne,
    put: gps_tracks.update,
    delete: gps_tracks.remove
  },
  'body_weight': {
    get: body_weight.getAll,
    post: body_weight.add
  },
  'body_weight/:id': {
    get: body_weight.getOne,
    put: body_weight.update,
    delete: body_weight.remove
  },
  'preferences': {
    get: preferences.getAll,
    put: preferences.update
  }
};
