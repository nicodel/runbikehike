/* globals Backbone, Preferences, Messages, Sessions, BodyWeights,
IndicatorsView, DashboardView, NavigationView, SessionsView, ReportsView, NewSession, Session */
/* exported Router */
'use strict';

var Router = Backbone.Router.extend({
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
