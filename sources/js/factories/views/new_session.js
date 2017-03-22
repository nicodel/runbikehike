/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.new_session = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-template-1').innerHTML),

  session   : new Session(),
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
    this.session.set(this.model.attributes);
    if (params.import_form_subview) {
      this.import_form_subview = new RBH.Factory.Views.new_session_import_form({
        'model': this.session
      });
    }
    /*if (params.altitude_subview) {
      this.altitude_subview = new views.new_view.altitude({
        'model' : this.session
      });
    }
    if (params.distance_subview) {
      this.distance_subview = new views.new_view.distance({
        'model' : this.session
      });
    }*/
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
    if (this.session.get('date')) {
      date = this.session.get('date');
    } else {
      date = new Date();
    }
    if (this.session.get('distance')) {
      distance = utils.Helpers.distanceMeterToChoice(
        pref_unit,
        this.session.get('distance'),
        false
      );
    } else {
        distance = {
          'value' : 0,
          'unit'  : 'm'
        };
    }
    if (this.session.get('time_intervae')) {
      duration = utils.Helpers.formatDuration(this.session.get('time_interval').duration);
    } else {
      duration = {
        'hour'  : 0,
        'min'   : 0,
        'sec'   : 0
      };
    }
    if (this.session.get('speed')) {
      speed = utils.Helpers.speedMsToChoice(pref_unit, this.session.get('speed'));
    } else {
      speed = {
        'value' : 0,
        'unit'  : 'km/h'
      };
    }
    if (this.session.get('altitude')) {
      altitude_maximum = this.session.get('altitude').maximum;
      altitude_minimum = this.session.get('altitude').minimum;
    } else {
      altitude_maximum = 0;
      altitude_minimum = 0;
    }
    if (this.session.get('calories')) {
      calories = this.session.get('calories');
    } else {
      calories = 0;
    }
    this.el.innerHTML = this.template({
      'lb_import_file': _('import-gpx-file'),
      'lb_import'     : _('import'),
      'lb_date'       : _('date-format'),
      'date'          : utils.Helpers.formatDate(date),
      'lb_time'       : _('start-time-format'),
      'time'          : utils.Helpers.formatTime(date),
      'lb_distance'   : _('distance-format'),
      'distance_unit' : distance.unit,
      'distance'      : distance.value,
      'lb_duration'   : _('duration-format'),
      'durationH'     : duration.hour,
      'durationM'     : duration.min,
      'durationS'     : duration.sec,
      'lb_alt_max'    : _('altitude-max'),
      'alt_max'       : altitude_maximum,
      'lb_alt_min'    : _('altitude-min'),
      'alt_min'       : altitude_minimum,
      'alt_unit'      : 'm',
      'lb_avg_speed'  : _('average-speed'),
      'avg_speed'     : speed.value,
      'speed_unit'    : speed.unit,
      'lb_calories'   : _('calories'),
      'calories'      : calories,
      'lb_map'        : _('map')
    });
    // console.log('new view rendered');
    //document.getElementById('new-session-import-form').appendChild(this.import_form_subview().el);
    return this;
  },

  renderImportedData: function() {
    this.validated.distance = true;
    this.validated.duration = true;
    var pref_unit = Preferences.get('unit');
    var distance = utils.Helpers.distanceMeterToChoice(
      pref_unit,
      this.session.get('distance'),
      false
    );
    var duration = utils.Helpers.formatDuration(this.session.get('time_interval').duration);
    var speed = utils.Helpers.speedMsToChoice(pref_unit, this.session.get('speed'));
    document.getElementById('new-session-date').value = utils.Helpers.formatDate(this.session.get('date'));
    document.getElementById('new-session-time').value = utils.Helpers.formatTime(this.session.get('date'));
    document.getElementById('new-session-distance').value = distance.value;
    // document.getElementById('new-session-distance-unit').innerHTML = distance.unit;
    document.getElementById('new-session-duration-hour').value = duration.hour;
    document.getElementById('new-session-duration-min').value = duration.min;
    document.getElementById('new-session-duration-sec').value = duration.sec;
    document.getElementById('new-session-alt-max').value = this.session.get('altitude').altitude_maximum;
    document.getElementById('new-session-alt-min').value = this.session.get('altitude').altitude_minimum;
    // document.getElementById('new-session-alt-unit-max').innerHTML = 'm';
    // document.getElementById('new-session-alt-unit-min').innerHTML = 'm';
    document.getElementById('new-session-avg-speed').value = speed.value;
    // document.getElementById('new-session-speed-unit').innerHTML = speed.unit;
    document.getElementById('new-session-calories').value =  this.session.get('calories');
  },

  renderCalories: function() {
    // console.log('this.model.get("time_interval")', this.model.get('time_interval'));
    var calories = utils.Helpers.calculateCalories(
        RBH.UserGender,
        RBH.UserHeight,
        RBH.UserWeight,
        new Date().getFullYear() - RBH.UserBirthYear,
        this.model.get('distance'),
        this.model.get('time_interval').duration,
        this.session.activity_name
    );
    document.getElementById('new-session-calories').value = calories;
    this.session.set('calories', calories);
  },

  renderAvgSpeed: function () {
    var speed = this.model.get('distance') / this.model.get('time_interval').duration;
    document.getElementById('new-message-avg-speed').value = speed;
    this.model.set('speed', speed);
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
      var da = this.model.get('date');
      var du = h * 3600 + m * 60 + s;
      this.model.set(     // TODO Check the possibility to set a model attribute like this
        'time_interval',
        {
          'duration'    : du,
          'start_date'  : da,
          'end-date'    : da + du
        }
      );
      this.validated.duration = true;
      // console.log('sending enable-add', this.validated);
      this.trigger('enable-add');
      if (this.validated.distance) {
        this.renderCalories();
        this.renderAvgSpeed();
      }
    } else {
      this.validated.duration = false;
      // console.log('sending disable-add', this.validated);
      this.trigger('disable-add');
    }
  },

  __validateDate: function() {
    var date = utils.Helpers.checkDate(document.getElementById('new-session-date').value);
    var time = utils.Helpers.checkTime(document.getElementById('new-session-time').value);
    if (date[0] && time[0]) {
      this.validated.date = true;
      // console.log('sending enable-add', this.validated);
      this.trigger('enable-add');
      var d = date[1];
      var t = time[1];
      this.session.set('date', new Date(d[2], d[1] - 1, d[0], t[0], t[1],t[2]));

    } else {
      this.validated.date = false;
      // console.log('sending disable-add', this.validated);
      this.trigger('disable-add');
    }
    // console.log('validate date', this.validated.date);
  }
});
