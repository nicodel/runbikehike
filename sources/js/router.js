/* jshint browser: true */
/* globals Backbone */
'use strict';

var RBH = RBH || {};

RBH.Router = Backbone.Router.extend({
  routes: {
    ''  : 'start'
  },

  start: function() {
    var lang = window.navigator.language;
    // check browser language to found out user measurment unit
    // USA, Liberia and Myarmar will use imperial, others metric
    if (lang === 'us-US' || lang === 'my', lang ==='lib') {
      RBH.UserUnit = 'imperial';
    } else {
      RBH.UserUnit = 'metric';
    }
    RBH.UserWeight = 94;
    RBH.UserHeight = 198;
    RBH.UserGender = 'male';
    RBH.UserBirthYear = 1974;
    // Preferences.fetch();
    // var messages = new RBH.Collections.Messages();
    // messages.fetch();
    // var sessions = new RBH.Collections.Sessions();
    // sessions.fetch();
    RBH.Collections.Sessions.fetch();
    RBH.Collections.GPSTracks.fetch();
    // var bodyweights = new RBH.Collections.BodyWeights();
    // bodyweights.fetch();
    // var calories =  new RBH.Collections.Calories();
    // calories.fetch();
    // console.log('RBH', RBH);
    RBH.Collections.Dashboard.fetch();

    // new RBH.Views.Sessions();
    //new RBH.Views.Reports();
    new RBH.Views.NewSession();
    new RBH.Views.Dashboard();
    new RBH.Views.Indicators();
    new RBH.Views.Navigation();
  }
});
