/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session */
'use strict';

var views = views || {};

views.new_session = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-template-basics').innerHTML),

  gps_track : '',

  import_form_subview : '',
  altitude_subview    : '',
  distance_subview    : '',

  events: {
    'change #new-session-date'          : '__validateDate',
    'change #new-session-time'          : '__validateDate',
    'change #new-session-duration-hour' : '__validateDuration',
    'change #new-session-duration-min'  : '__validateDuration',
    'change #new-session-duration-sec'  : '__validateDuration',
  },

  validated: {
    distance  : false,
    duration  : false,
    date      : true
  },

  initialize: function(params) {
    //this.model.set(this.model.attributes);
    if (params.import_form_subview) {
      this.import_form_subview = new views.new_session_import_form({
        'model': this.model
      });
    }
    console.log('getting a listener on this.model', this.model);
    this.listenTo(this.model, 'data-imported', this.renderImportedData);
  },

  render: function() {

    this.validated.distance = true;
    this.validated.duration = true;
    var pref_unit = Preferences.get('unit');
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
        pref_unit,
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
      speed = utils.Helpers.speedMsToChoice(pref_unit, this.model.get('speed'));
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
      'calories'      : calories,
    });
    // console.log('new view rendered');
    //document.getElementById('new-session-import-form').appendChild(this.import_form_subview().el);
    return this;
  },

  renderImportedData: function() {
    console.log('render Imported data', this.model);
    //this.validated.distance = true;
    this.validated.duration = true;
    var pref_unit = Preferences.get('unit');
    /*var distance = utils.Helpers.distanceMeterToChoice(
      pref_unit,
      this.model.get('distance'),
      false
    );*/
    var duration = utils.Helpers.formatDuration(this.model.get('time_interval').duration);
    //var speed = utils.Helpers.speedMsToChoice(pref_unit, this.model.get('speed'));
    document.getElementById('new-session-date').value = utils.Helpers.formatDate(this.model.get('date'));
    document.getElementById('new-session-time').value = utils.Helpers.formatTime(this.model.get('date'));
//    document.getElementById('new-session-distance').value = distance.value;
    document.getElementById('new-session-duration-hour').value = duration.hour;
    document.getElementById('new-session-duration-min').value = duration.min;
    document.getElementById('new-session-duration-sec').value = duration.sec;
//    document.getElementById('new-session-alt-max').value = this.model.get('altitude').altitude_maximum;
//    document.getElementById('new-session-alt-min').value = this.model.get('altitude').altitude_minimum;
    // document.getElementById('new-session-alt-unit-max').innerHTML = 'm';
    // document.getElementById('new-session-alt-unit-min').innerHTML = 'm';
//    document.getElementById('new-session-avg-speed').value = speed.value;
    // document.getElementById('new-session-speed-unit').innerHTML = speed.unit;
    document.getElementById('new-session-calories').value =  this.model.get('calories');
  },

  renderCalories: function() {
    console.log('this.model.get("time_interval")', this.model.get('time_interval'));
    var calories = utils.Helpers.calculateCalories(
        Preferences.get('gender'),
        Preferences.get('weight'),
        Preferences.get('height'),
        new Date().getFullYear() - Preferences.get('birthyear'),
        this.model.get('distance'),
        this.model.get('time_interval').duration,
        this.model.activity_name
    );
    document.getElementById('new-session-calories').value = calories;
    this.model.set('calories', calories);
  },

  __validateDuration: function() {
    var h = parseInt(document.getElementById('new-session-duration-hour').value, 10);
    var m = parseInt(document.getElementById('new-session-duration-min').value, 10);
    var s = parseInt(document.getElementById('new-session-duration-sec').value, 10);
    // console.log('new duration', h, m, s);
    if (Number.isNaN(h) || Number.isNaN(m) || Number.isNaN(s)) {
      this.validated.duration = false;
      this.trigger('disable-add');
    } else if (h >= 0 || h <= 24 && m >= 0 || m <= 60 && s >= 0 || s <= 60) {
      // console.log('new duration', h * 3600 + m * 60 + s);
      this.model.set(     // TODO Check the possibility to set a model attribute like this
        'time_interval',
        {'duration': h * 3600 + m * 60 + s}
      );
      this.validated.duration = true;
      console.log('sending enable-add', this.validated);
      this.trigger('enable-add');
      if (this.validated.distance) {
        this.renderCalories();
        this.renderAvgSpeed();
      }
    } else {
      this.validated.duration = false;
      console.log('sending disable-add', this.validated);
      this.trigger('disable-add');
    }
  },

  __validateDate: function() {
    var date = utils.Helpers.checkDate(document.getElementById('new-session-date').value);
    var time = utils.Helpers.checkTime(document.getElementById('new-session-time').value);
    if (date[0] && time[0]) {
      this.validated.date = true;
      console.log('sending enable-add', this.validated);
      this.trigger('enable-add');
      var d = date[1];
      var t = time[1];
      this.model.set('date', new Date(d[2], d[1] - 1, d[0], t[0], t[1],t[2]));

    } else {
      this.validated.date = false;
      console.log('sending disable-add', this.validated);
      this.trigger('disable-add');
    }
    // console.log('validate date', this.validated.date);
  }
});
