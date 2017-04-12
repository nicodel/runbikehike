/* jshint browser: true */
/* globals _, Backbone, microtemplate, utils, Session,  GPSTrack */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.new_session_distance = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-distance-template').innerHTML),

  events : {
    'change #new-session-distance'      : '__validateDistance'
  },

  validated: {
    distance: false
  },

  initialize: function (params) {
    this.listenTo(this.model, 'data-imported', this.renderImportedData);
    // TODO find a better way to know speed are ready to render
    this.listenTo(this.model, 'new-session-render-speed', this.renderAvgSpeed);
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

  renderAvgSpeed: function () {
    var speed = this.model.get('avg_speed');
    document.getElementById('new-session-avg-speed').value = utils.Helpers.speedMsToChoice(
      RBH.UserUnit,
      speed
    ).value;
  },

  __validateDistance: function() {
    var d = parseFloat(document.getElementById('new-session-distance').value);
    this.trigger('new-session-distance-changed', d);
  }
});
