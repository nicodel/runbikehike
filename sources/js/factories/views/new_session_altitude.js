/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session,  GPSTrack */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.new_session_altitude = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-altitude-template').innerHTML),

  validated: {
    altitude: false
  },

  initialize: function (params) {
    this.listenTo(this.model, 'data-imported', this.renderImportedData);
  },

  render: function () {
    var altitude_maximum = 0;
    var altitude_minimum = 0;

    if (this.model.get('altitude')) {
      altitude_maximum = this.model.get('altitude').maximum;
      altitude_minimum = this.model.get('altitude').minimum;
    }

    this.el.innerHTML = this.template({
      'lb_alt_max'    : _('altitude-max'),
      'alt_max'       : altitude_maximum,
      'lb_alt_min'    : _('altitude-min'),
      'alt_min'       : altitude_minimum,
      'alt_unit'      : 'm',
    });
    return this;
  },

  renderImportedData: function () {
    this.validated.altitude = true;
    var pref_unit = Preferences.get('unit');
    document.getElementById('new-session-alt-max').value = this.model.get('altitude').altitude_maximum;
    document.getElementById('new-session-alt-min').value = this.model.get('altitude').altitude_minimum;
  }

});
