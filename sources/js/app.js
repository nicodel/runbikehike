/* jshint browser: true */
/* exported _ */
/* globals Backbone */
'use strict';
var RBH = RBH || {};

document.addEventListener('DOMContentLoaded', function() {
  // console.log("document.webL10n.getLanguage()", document.webL10n.getLanguage());
  var _ = document.webL10n.get;
  console.log('launching');
  new RBH.Router();
  Backbone.history.start();
}, false);
