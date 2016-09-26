/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session,  GPSTrack */
'use strict';

var views = views || {};

views.new_session_altitude = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-altitude-template').innerHTML),

  initialize: function (params) {
    this.session = params.model;
  },

  render: function () {
    var altitude_maximum = 0;
    var altitude_minimum = 0;

    if (this.session.get('altitude')) {
      altitude_maximum = this.session.get('altitude').maximum;
      altitude_minimum = this.session.get('altitude').minimum;
    }

    this.el.innerHTML = this.template({
      'lb_alt_max'    : _('altitude-max'),
      'alt_max'       : altitude_maximum,
      'lb_alt_min'    : _('altitude-min'),
      'alt_min'       : altitude_minimum,
      'alt_unit'      : 'm',
    });
    return this;
  }

});
