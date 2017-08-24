/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.new_session = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-template-basics').innerHTML),

  gps_track : '',

  import_form_subview : '',
  altitude_subview    : '',
  distance_subview    : '',

  validated: {
    duration: false,
    date: false
  },

  events: {
    'change #new-session-date'          : '__validateDate',
    'change #new-session-time'          : '__validateDate',
    'change #new-session-duration-hour' : '__validateDuration',
    'change #new-session-duration-min'  : '__validateDuration',
    'change #new-session-duration-sec'  : '__validateDuration',
    // TODO understand why change event is not fired when new-session-distance  value is changed
    // 'change #new-session-distance'      : '__distanceChanged'
  },

  initialize: function(params) {
    //this.model.set(this.model.attributes);
    if (params.import_form_subview) {
      this.import_form_subview = new RBH.Factory.Views.new_session_import_form({
        'model': this.model
      });
    }
    // console.log('getting a listener on this.model', this.model);
    this.listenTo(this.model, 'data-imported', this.renderImportedData);
    // TODO find a better way to know calories are ready to render
    this.listenTo(this.model, 'new-session-render-calories', this.renderCalories);
    // this.listenTo(this, 'all', function (ev, res) { console.log('NEW_SESSION_BASCIS - ', ev, res); });
  },

  render: function() {

    this.validated.distance = true;
    this.validated.duration = true;
    // var pref_unit = Preferences.get('unit');
    // var pref_unit = 'metric'; // TODO manage the Preferences
    var date;
    var distance;
    var duration;
    var speed;
    var calories;
    var altitude_maximum;
    var altitude_minimum;
    if (this.model.get('date')) {
      date = this.model.get('date');
    } else {
      date = new Date();
    }
    if (this.model.get('distance')) {
      distance = utils.Helpers.distanceMeterToChoice(
        RBH.UserUnit,
        this.model.get('distance'),
        false
      );
    } else {
        distance = {
          'value' : 0,
          'unit'  : 'm'
        };
    }
    if (this.model.get('time_interval')) {
      duration = utils.Helpers.formatDuration(this.model.get('time_interval').duration);
    } else {
      duration = {
        'hour'  : 0,
        'min'   : 0,
        'sec'   : 0
      };
    }
    if (this.model.get('speed')) {
      speed = utils.Helpers.speedMsToChoice(RBH.UserUnit, this.model.get('speed'));
    } else {
      speed = {
        'value' : 0,
        'unit'  : 'km/h'
      };
    }
    if (this.model.get('altitude')) {
      altitude_maximum = this.model.get('altitude').maximum;
      altitude_minimum = this.model.get('altitude').minimum;
    } else {
      altitude_maximum = 0;
      altitude_minimum = 0;
    }
    if (this.model.get('calories')) {
      calories = this.model.get('calories');
    } else {
      calories = 0;
    }
    this.el.innerHTML = this.template({
      'lb_date'       : _('date-format'),
      'date'          : utils.Helpers.formatDate(date),
      'lb_time'       : _('start-time-format'),
      'time'          : utils.Helpers.formatTime(date),
      'lb_duration'   : _('duration-format'),
      'durationH'     : duration.hour,
      'durationM'     : duration.min,
      'durationS'     : duration.sec,
      'lb_calories'   : _('calories'),
      'calories'      : calories
    });
    // console.log('new view rendered');
    //document.getElementById('new-session-import-form').appendChild(this.import_form_subview().el);
    return this;
  },

  renderImportedData: function() {
    this.validated.distance = true;
    this.validated.duration = true;
    //var speed = utils.Helpers.speedMsToChoice(pref_unit, this.model.get('speed'));
    var t = utils.Helpers.formatTime(this.model.get('date'));
    var d = utils.Helpers.formatDate(this.model.get('date'));
    document.getElementById('new-session-date').value = d;
    document.getElementById('new-session-time').value = t;
    this.__validateDate();
//    document.getElementById('new-session-distance').value = distance.value;
    var duration = utils.Helpers.formatDuration(this.model.get('time_interval').duration);
    // console.log('duration', duration);
    document.getElementById('new-session-duration-hour').value = duration.hour;
    document.getElementById('new-session-duration-min').value = duration.min;
    document.getElementById('new-session-duration-sec').value = duration.sec;
    this.__validateDuration();
//    document.getElementById('new-session-alt-max').value = this.model.get('altitude').altitude_maximum;
//    document.getElementById('new-session-alt-min').value = this.model.get('altitude').altitude_minimum;
    // document.getElementById('new-session-alt-unit-max').innerHTML = 'm';
    // document.getElementById('new-session-alt-unit-min').innerHTML = 'm';
//    document.getElementById('new-session-avg-speed').value = speed.value;
    // document.getElementById('new-session-speed-unit').innerHTML = speed.unit;
    document.getElementById('new-session-calories').value =  this.model.get('calories');
  },

  // TODO manage when user did not give one or all the needed information below
  renderCalories: function() {
    var calories = utils.Helpers.calculateCalories(
        RBH.UserGender,
        RBH.UserHeight,
        RBH.UserWeight,
        new Date().getFullYear() - RBH.UserBirthYear,
        this.model.get('distance'),
        this.model.get('time_interval').duration,
        this.model.get('activity_name')
    );
    document.getElementById('new-session-calories').value = calories;
    this.model.set('calories', calories);
    // console.log('calories', calories);
  },

  __validateDuration: function() {
    var h = parseInt(document.getElementById('new-session-duration-hour').value, 10);
    var m = parseInt(document.getElementById('new-session-duration-min').value, 10);
    var s = parseInt(document.getElementById('new-session-duration-sec').value, 10);
    this.trigger('new-session-duration-changed', h, m, s);
  },

  __validateDate: function() {
    var date = utils.Helpers.checkDate(document.getElementById('new-session-date').value);
    var time = utils.Helpers.checkTime(document.getElementById('new-session-time').value);
    this.trigger('new-session-date-changed', date, time);
  }
});
