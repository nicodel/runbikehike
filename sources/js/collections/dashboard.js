/* globals _, Backbone, Item, Messages */
/* exported Dashboard */
'use strict';

var DashboardCollection = Backbone.Collection.extend({
  model: Item,
  url: '/dashboard',

  initialize: function () {
    this.listenTo(this, 'all', function(ev, res) {console.log('DashboardCollection', ev, res);});
    this.listenTo(Messages, 'add', this.newMessage);
  },

  newMessage: function (message) {
    console.log('DashboardCollection.newMessage', message);
    this.add(message);
  }
});
var Dashboard = new DashboardCollection();
