/* jshint browser: true */
/* globals _, Backbone, microtemplate, utils, Session,  GPSTrack */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.new_session_distance = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-distance-template').innerHTML),

  events : {
    'change #new-session-distance'  : '__validateDistance',
  },

  validated: {
    distance: false
  },

  initialize: function (params) {
    this.listenTo(this.model, 'data-imported', this.renderImportedData);
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
    // var pref_unit = Preferences.get('unit');
    if (this.model.get('distance')) {
      distance = utils.Helpers.distanceMeterToChoice(
        RBH.UserUnit,
        this.model.get('distance'),
        false
      );
    }
    if (this.model.get('speed')) {
      speed = utils.Helpers.speedMsToChoice(RBH.UserUnit, this.model.get('speed'));
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

  renderImportedData: function () {
    this.validated.distance = true;
    // var pref_unit = Preferences.get('unit');
    var distance = utils.Helpers.distanceMeterToChoice(
      RBH.UserUnit,
      this.model.get('distance'),
      false
    );
    var speed = utils.Helpers.speedMsToChoice(RBH.UserUnit, this.model.get('speed'));
    document.getElementById('new-session-distance').value = distance.value;
    document.getElementById('new-session-avg-speed').value = speed.value;
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
          RBH.UserUnit,
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
