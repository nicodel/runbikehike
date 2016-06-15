/* globals Backbone, Preferences, Messages, Sessions,
IndicatorsView, DashboardView, NavigationView */
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
    Preferences.fetch();
    Messages.fetch();
    Sessions.fetch();

    new IndicatorsView();
    new NavigationView();
    new DashboardView();
  }
});
