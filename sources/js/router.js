/* globals Backbone, Preferences, Messages, Sessions, BodyWeights,
IndicatorsView, DashboardView, NavigationView, SessionsView, ReportsView, NewSession, Session */
/* exported Router */
'use strict';

var RBH = RBH || {};

RBH.Router = Backbone.Router.extend({
  routes: {
    ''  : 'start'
  },

  start: function() {
    //Preferences.fetch();
    Messages.fetch();
    Sessions.fetch();
    BodyWeights.fetch();
    Calories.fetch();

    new RBH.Views.Navigation();
    new RBH.Views.Dashboard();
    new RBH.Views.Indicators();
    new RBH.Views.Sessions();
    new RBH.Views.Reports();
    new RBH.Views.NewSession();
  }
});
