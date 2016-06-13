/* globals Backbone, Dashboard, Messages, IndicatorsView, DashboardView */
/* exported Router */
'use strict';

var Router = Backbone.Router.extend({
  initialize: function() {
    // console.log('starting router');
  },
  routes: {
    ''  : 'start'
  },

  start: function() {
    Dashboard.fetch();
    Messages.fetch();

    new IndicatorsView();
    new DashboardView();
  }
});
