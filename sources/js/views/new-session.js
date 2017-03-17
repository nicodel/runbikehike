/* jshint browser: true */
/* globals Backbone, microtemplate */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.NewSession = Backbone.NativeView.extend({
  el: '#new-session-view',

  gps_id: '',
  model: new RBH.Models.Session(),
  gps_track: '',
  activity_name: '',

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
        'activity_name' : element.target.value
      });
      this.activity_name = element.target.value;
      // this.subview = Factory.getNewView('session', this.model);
      var views = RBH.Factory.getSessionNewView(this.model);
      console.log('views to be displayed is', views);

      if (views.import_form) {
        var import_form_subview = views.import_form_subview;
        this.el.appendChild(document.createElement('div').innerHTML = views.import_form.render().el);
      }

      this.subview = views.basics;
      this.el.appendChild(document.createElement('div').innerHTML = this.subview.render().el);

      if (views.altitude) {
        this.el.appendChild(document.createElement('div').innerHTML = views.altitude.render().el);
      }
      if (views.distance) {
        this.el.appendChild(document.createElement('div').innerHTML = views.distance.render().el);
      }

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
    console.log('enable-add', btn.getAttribute('disabled'));
    if (btn.getAttribute('disabled') === 'disabled') {
      btn.removeAttribute('disabled');
    }
  },

  disableAdd: function() {
    var btn = document.getElementById('confirm-add-session-btn');
    console.log('disable-add', btn.getAttribute('disabled'));
    if (btn.getAttribute('disabled') === null) {
      btn.setAttribute('disabled', 'disabled');
    }
 },

 registerGPSTrackImported: function (track) {
   console.log('GPS track to register', track);
   this.model.set('gps_track', {
     'available'  : true,
     'track_id'   : track.get('cid')
   });
   console.log('track has been added', this.model.get('gps_track'));
 },

 registerSessionValues: function (model) {
   console.log('model to store as a session', model);
   if (model.get('gps_track').available === true) {
     model.set('gps_track', {
       'available'  : true,
       'track_id'   : this.gps_id
     });
   }
   this.model = model;
   console.log('Session to register');
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
    console.log('addNewSession - this.model', this.model);
    console.log('addNewSession - this.gps_track', this.gps_track);

    var s = this.collection.add(this.model);
    console.log('new session to save', s);
    s.save();
    this.collection.trigger('add-new', s);


    //var g = GPSTracks.add(this.gps_track);
    //g.save();

    // Cleaning Views
    this.subview.remove();
  }
});
