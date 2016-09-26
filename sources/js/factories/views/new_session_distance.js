/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session,  GPSTrack */
'use strict';

var views = views || {};

views.new_session_distance = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-distance-template').innerHTML),

  events : {
    'change #new-session-distance'  : '__validateDistance',
  },

  validated: {
    distance: false
  },

  initialize: function (params) {
    this.session = params.model;
  },

  render: function () {
    var distance = {
      'value' : 0,
      'unit'  : 'm'
    };
    var speed = {
      'value' : 0,
      'unit'  : 'km/h'
    };
    var pref_unit = Preferences.get('unit');
    if (this.session.get('distance')) {
      distance = utils.Helpers.distanceMeterToChoice(
        pref_unit,
        this.session.get('distance'),
        false
      );
    }
    if (this.session.get('speed')) {
      speed = utils.Helpers.speedMsToChoice(pref_unit, this.session.get('speed'));
    }

    this.el.innerHTML = this.template({
      'lb_distance'   : _('distance-format'),
      'distance_unit' : distance.unit,
      'distance'      : distance.value,
      'lb_avg_speed'  : _('average-speed'),
      'avg_speed'     : speed.value,
      'speed_unit'    : speed.unit
    });
    return this;
  },
  __validateDistance: function() {
    var d = parseFloat(document.getElementById('new-session-distance').value);
    if (Number.isNaN(d)) {
      this.validated.distance = false;
      //console.log('sending disable-add', this.validated);
      this.trigger('disable-add');
    } else {
      this.model.set(
        'distance',
        utils.Helpers.distanceChoiceToMeter(
          Preferences.get('unit'),
          d
        )
      );
      this.validated.distance = true;
      this.trigger('enable-add');
      //console.log('sending enable-add', this.validated);
      if (this.validated.duration) {
        this.renderCalories();
        this.renderAvgSpeed();
      }
    }
  }

});
