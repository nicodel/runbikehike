/* globals _, Backbone, Item, Messages */
/* exported Dashboard */
'use strict';

var DashboardCollection = Backbone.Collection.extend({
  model: Item,
  url: 'data/dashboard',
  // initialize: function () {
  //   this.listenTo(this, 'all', function(ev, res) {console.log('DASHBOARD Collection', ev, res);});
  // }
});
var Dashboard = new DashboardCollection();
