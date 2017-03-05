/* jshint browser: true */
/* globals Sessions, ModalView,
 Backbone, microtemplate, Preferences, utils */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.details_session_altitude = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('details-session-altitude-template').innerHTML),

  initialize: function () {
    this.render();
  },

  render: function() {
    var user_unit = Preferences.get('unit');
    var alt_max = utils.Helpers.distanceMeterToChoice(
        user_unit,
        this.model.get('altitude').altitude_maximum,
        false);
    var alt_min = utils.Helpers.distanceMeterToChoice(
        user_unit,
        this.model.get('altitude').altitude_minimum,
        false);

    this.el.innerHTML = this.template({
      'alt_max' : alt_max.value + ' ' + alt_max.unit,
      'alt_min' : alt_min.value + ' ' + alt_min.unit,
    });
  }
});
