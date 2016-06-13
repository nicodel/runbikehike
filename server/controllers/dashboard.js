/* jshint strict: true, node: true */
'use strict';

var Messages = require('./messages');

module.exports.getAll = function (req, res, next) {
  console.log('dashboard.getAll');
  Messages.getAll(req, res, next);
};
module.exports.add = function () {
  console.log('dashboard.add');
};
module.exports.update = function () {
  console.log('dashboard.update');
};
module.remove = function () {
  console.log('dashbaord.remove');
};
