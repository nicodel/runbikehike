/* globals Backbone, Dashboard, Messages, IndicatorsView, DashboardView,
NavigationView */
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
    Messages.fetch();

    new IndicatorsView();
    new NavigationView();
    new DashboardView();
  }
});
