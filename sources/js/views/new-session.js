/* jshint browser: true */
/* globals Backbone, microtemplate, utils */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.NewSession = Backbone.NativeView.extend({
  el: '#new-session-view',

  gps_id: '',
  model: new RBH.Models.Session(),
  gps_track: '',
  activity_name: '',
  validated: {
    duration  : false,
    date      : true
  },
  subviews : {},

  subview: '',

  events: {
    'click #select-activity'          : 'activitySelected',
    'click #confirm-add-session-btn'  : 'addNewSession'
  },

  dom: {
    activity    : document.getElementById('new-activity-details'),
  },

  template : microtemplate(document.getElementById('new-session-activity').innerHTML),

  initialize: function () {
    this.collection = RBH.Collections.Sessions;
    document.getElementById('select-activity').innerHTML = '';
    var activities = RBH.Factory.getActivitiesList();
    for (var i = 0; i < activities.length; i++) {
      this.renderIcon(activities[i]);
    }
    this.listenTo(this.model, 'data-imported', this.renderImportedData);
    this.listenTo(this.model, 'gps-track-imported', this.registerGPSTrackImported);
  },

  renderIcon: function (activity) {
    var label = document.createElement('label');
    label.setAttribute('for', activity);
    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'select-activity');
    input.setAttribute('value', activity);
    input.setAttribute('id', activity);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/activities/' + activity + '.png');
    img.setAttribute('alt', activity);
    label.appendChild(input);
    label.appendChild(img);
    document.getElementById('select-activity').appendChild(label);
  },

  activitySelected: function(element) {
    // cleaning previous view (if any)
    if (this.subview) {
      this.subview.remove();
    }
    if (element.target.nodeName === 'INPUT') {
      this.model.set({
        'activity_name' : element.target.value,
        'date'          : new Date(),
        'docType'       : 'sessions'
      });
      this.activity_name = element.target.value;
      // this.subview = Factory.getNewView('session', this.model);
      var views = RBH.Factory.getSessionNewView(this.model);
      // console.log('views to be displayed is', views);

      if (views.import_form) {
        var import_form_subview = views.import_form_subview;
        this.el.appendChild(document.createElement('div').innerHTML = views.import_form.render().el);
        this.subviews.import_form = true;
      }

      this.subview = views.basics;
      this.el.appendChild(document.createElement('div').innerHTML = this.subview.render().el);

      if (views.altitude) {
        this.el.appendChild(document.createElement('div').innerHTML = views.altitude.render().el);
        this.subviews.altitude = true;
      }
      if (views.distance) {
        this.validated.distance = false;
        this.listenTo(views.distance, 'new-session-distance-changed', this.distanceChanged);
        this.el.appendChild(document.createElement('div').innerHTML = views.distance.render().el);
        this.subviews.distance = true;
      }

      // add listener to bascis subview for duration and date change
      this.listenTo(this.subview, 'new-session-duration-changed', this.durationChanged);
      this.listenTo(this.subview, 'new-session-date-changed', this.dateChanged);

      // add listener to subview to enable/disable the Add button
      this.listenTo(this.subview, 'enable-add', this.enableAdd);
      this.listenTo(this.subview, 'disable-add', this.disableAdd);
      // add listener to the possible session and gps track import
      this.listenTo(this.subview, 'gps-track-imported', this.registerGPSTrack);
      this.listenTo(this.subview, 'session-defined', this.registerSessionValues);
    }
  },

  enableAdd: function() {
    var btn = document.getElementById('confirm-add-session-btn');
    // console.log('enable-add', btn.getAttribute('disabled'));
    if (btn.getAttribute('disabled') === 'disabled') {
      btn.removeAttribute('disabled');
    }
  },

  disableAdd: function() {
    var btn = document.getElementById('confirm-add-session-btn');
    // console.log('disable-add', btn.getAttribute('disabled'));
    if (btn.getAttribute('disabled') === null) {
      btn.setAttribute('disabled', 'disabled');
    }
  },

  dateChanged: function (date, time) {
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
  },

  distanceChanged: function (distance) {
    if (Number.isNaN(distance)) {
      this.validated.distance = false;
      this.trigger('disable-add');
    } else {
      this.model.set(
        'distance',
        utils.Helpers.distanceChoiceToMeter(
          RBH.UserUnit,
          distance
        )
      );
      this.validated.distance = true;
      this.calculateAvgSpeed();
      this.calculateCalories();
      this.trigger('enable-add');
    }
  },

  durationChanged: function (h, m, s) {
    if (Number.isNaN(h) || Number.isNaN(m) || Number.isNaN(s)) {
      this.validated.duration = false;
      this.disableAdd();
    } else if (h >= 0 || h < 24 && m >= 0 || m < 60 && s >= 0 || s < 60) {
      // this.trigger('new-session-duration-changed', h, m, s);
      this.model.set(
        'time_interval',
        {'duration': h * 3600 + m * 60 + s}
      );
      this.validated.duration = true;
      this.enableAdd();
      if (this.subviews.distance) {
        if (this.validated.distance) {
          this.calculateCalories();
          this.calculateAvgSpeed();
        }
      } else {
        this.calculateCalories();
      }
    } else {
      this.validated.duration = false;
      this.disableAdd();
    }
  },

  calculateCalories: function () {
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
    this.model.trigger('new-session-render-calories');
  },

  calculateAvgSpeed: function () {
    if (this.model.get('time_interval')) {
      var speed = this.model.get('distance') / this.model.get('time_interval').duration;
      this.model.set('avg_speed', speed);
      this.model.trigger('new-session-render-speed');
    }
  },

 registerGPSTrackImported: function (track) {
  //  console.log('GPS track to register', track);
   this.model.set('gps_track', {
     'available'  : true,
     'track_id'   : track.get('cid')
   });
  //  console.log('track has been added', this.model.get('gps_track'));
 },

 registerSessionValues: function (model) {
  //  console.log('model to store as a session', model);
   if (model.get('gps_track').available === true) {
     model.set('gps_track', {
       'available'  : true,
       'track_id'   : this.gps_id
     });
   }
   this.model = model;
  //  console.log('Session to register');
 },

  addNewSession: function() {
    for (var i = 0; i < this.subview.validated.length; i++) {
      var criteria = this.subview.validated[i];
      if (!criteria) {
        // TODO Manage error messages and invalid values in new-session form
        // console.log('something is not right and session could not be added', this.validated);
        return;
      }
    }
    // console.log('addNewSession - this.model', this.model);
    // console.log('addNewSession - this.gps_track', this.gps_track);

    var s = this.collection.add(this.model);
    s.save();
    this.collection.trigger('add-new', s);


    //var g = GPSTracks.add(this.gps_track);
    //g.save();

    // Cleaning Views
    this.subview.remove();
  }
});
