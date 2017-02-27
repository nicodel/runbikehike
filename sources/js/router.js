/* globals Backbone */
'use strict';

var RBH = RBH || {};

RBH.Router = Backbone.Router.extend({
  routes: {
    ''  : 'start'
  },

  start: function() {
    //Preferences.fetch();
    var messages = new RBH.Collections.Messages();
    messages.fetch();
    var sessions = new RBH.Collections.Sessions();
    sessions.fetch();
    var bodyweights = new RBH.Collections.BodyWeights();
    bodyweights.fetch();
    var calories =  new RBH.Collections.Calories();
    calories.fetch();
    console.log('RBH', RBH);

    new RBH.Views.Navigation();
    new RBH.Views.Dashboard();
    new RBH.Views.Indicators();
    new RBH.Views.Sessions();
    new RBH.Views.Reports();
    new RBH.Views.NewSession();
  }
});
