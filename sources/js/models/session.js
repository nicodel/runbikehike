/* globals Backbone */
/* exported Session */
'use strict';
var RBH = RBH || {};
RBH.Models = RBH.Models || {};

RBH.Models.Session = Backbone.Model.extend({
  idAttribute: '_id'
});
