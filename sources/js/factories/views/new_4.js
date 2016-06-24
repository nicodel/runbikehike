/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils */
'use strict';

var views = views || {};

views.new_4 = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-template-4').innerHTML),

  events: {
    'change #new-session-date'          : '__validateDate',
    'change #new-session-time'          : '__validateDate',
    'change #new-session-duration-hour' : '__validateDuration',
    'change #new-session-duration-min'  : '__validateDuration',
    'change #new-session-duration-sec'  : '__validateDuration',
  },

  validated: {
    duration  : false,
    date      : true
  },

  render: function() {
    this.validated.distance = true;
    this.validated.duration = true;
    var pref_unit = Preferences.get('unit');
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    this.el.innerHTML = this.template({
      'lb_date'       : _('date-format'),
      'date'          : utils.Helpers.formatDate(this.model.get('date')),
      'lb_time'       : _('start-time-format'),
      'time'          : utils.Helpers.formatTime(this.model.get('date')),
      'lb_duration'   : _('duration-format'),
      'durationH'     : duration.hour,
      'durationM'     : duration.min,
      'durationS'     : duration.sec,
      'lb_calories'   : _('calories'),
      'calories'      : this.model.get('calories')
    });
    console.log('new view rendered');
    return this;
  },

  renderCalories: function() {
    var calories = utils.Helpers.calculateCalories(
        Preferences.get('gender'),
        Preferences.get('weight'),
        Preferences.get('height'),
        new Date().getFullYear() - Preferences.get('birthyear'),
        0,
        this.model.get('duration'),
        this.model.get('activity')
    );
    document.getElementById('new-session-calories').value = calories;
    this.model.set('calories', calories);
  },

  __validateDate: function() {
    var date = utils.Helpers.checkDate(document.getElementById('new-session-date').value);
    var time = utils.Helpers.checkTime(document.getElementById('new-session-time').value);
    if (date[0] && time[0]) {
      this.validated.date = true;
      this.trigger('enable-add');
      var d = date[1];
      var t = time[1];
      this.model.set('date', new Date(d[2], d[1] - 1, d[0], t[0], t[1],t[2]));
    } else {
      this.validated.date = false;
      this.trigger('disable-add');
    }
    // console.log('validate date', this.validated.date);
  },

  __validateDistance: function() {
    var d = parseFloat(document.getElementById('new-session-distance').value);
    if (Number.isNaN(d)) {
      this.validated.distance = false;
      this.trigger('disable-add');
    } else {
      this.model.set(
        'distance',
        utils.Helpers.distanceChoiceToMeter(
          Preferences.get('unit'), d)
      );
      this.validated.distance = true;
      this.trigger('enable-add');
      if (this.validated.duration) {
        this.renderCalories();
        this.renderAvgSpeed();
      }
    }
  }
});
