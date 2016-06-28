/* globals Backbone, Preferences, Messages, Sessions, Bodies,
IndicatorsView, DashboardView, NavigationView, SessionsView, ReportsView */
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
    Bodies.fetch();

    new NavigationView();
    new DashboardView();
    new IndicatorsView();
    new SessionsView();
    new ReportsView();
  }
});
