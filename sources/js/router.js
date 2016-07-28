/* globals Backbone, Preferences, Messages, Sessions, BodyWeights,
IndicatorsView, DashboardView, NavigationView, SessionsView, ReportsView, NewSession */
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
    BodyWeights.fetch();

    new NavigationView();
    new DashboardView();
    new IndicatorsView();
    new SessionsView();
    new ReportsView();
    new NewSession();
  }
});
