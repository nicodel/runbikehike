/* globals Backbone */
/* exported Preferences */
'use strict';
var RBH = RBH || {};
RBH.Models = RBH.Models || {};

RBH.Models.Preferences = Backbone.Model.extend({

  urlRoot: 'preferences',

  idAttribute: '_id',

  initialize: function() {
    // console.log('PreferencesModel initialize', this);
  }
});
var Preferences = new RBH.Models.Preferences({parse: true});
