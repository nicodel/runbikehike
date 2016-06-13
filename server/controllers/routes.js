/* jshint strict: true, node: true */
'use strict';

var messages = require('./messages');
var preferences = require('./preferences');

module.exports = {
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
