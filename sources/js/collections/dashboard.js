/* globals _, Backbone, Item */
/* exported Dashboard */
'use strict';

var DashboardCollection = Backbone.Collection.extend({
  model: Item,
  url: '/dashboard'
});
var Dashboard = new DashboardCollection();
