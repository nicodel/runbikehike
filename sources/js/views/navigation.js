/* jshint browser: true */
/* globals Backbone, Factory, Session, Preferences,
   PreferencesView, NewSession, */
/* exported NavigationView */
'use strict';

var NavigationView = Backbone.NativeView.extend({
  el: 'nav',
  events: {
    'click #new-session-btn'  : 'showNewSession',
    'click #dashboard-btn'    : 'showDashboard',
    'click #sessions-btn'     : 'showSessions',
    'click #reports-btn'      : 'showReports',
    'click #preferences-btn'  : 'showPreferences'
  },
  dom: {
    dashboard_view    : document.getElementById('dashboard-view'),
    session_view      : document.getElementById('session-view'),
    new_session_view  : document.getElementById('new-session-view'),
    sessions_view     : document.getElementById('sessions-view'),
    reports_view      : document.getElementById('reports-view'),
    preference_view   : document.getElementById('preferences-view'),
    dashboard_btn     : document.getElementById('dashboard-btn'),
    new_session_btn   : document.getElementById('new-session-btn'),
    sessions_btn      : document.getElementById('sessions-btn'),
    reports_btn       : document.getElementById('reports-btn'),
    preference_btn    : document.getElementById('preferences-btn')

  },

  initialize: function () {
    this.active_section = this.dom.dashboard_view;
    this.active_button = this.dom.dashboard_btn;
  },

  showNewSession: function() {
    console.log('showNewSession');
    new NewSession({
      model: new Session()
    });
    this._viewSection(this.dom.new_session_view, this.dom.new_session_btn);
  },

  showDashboard: function() {
    this._viewSection(this.dom.dashboard_view, this.dom.dashboard_btn);
  },

  showSessions: function() {
    this._viewSection(this.dom.sessions_view, this.dom.sessions_btn);
  },

  showReports: function() {
    this._viewSection(this.dom.reports_view, this.dom.reports_btn);
  },

  showPreferences: function() {
    new PreferencesView({
      model: Preferences
    });
    this._viewSection(this.dom.preference_view, this.dom.preference_btn);
  },

  _viewSection: function(section, button) {
    console.log('viewSection', section);
    if (section !== this.active_section) {
      this.active_section.setAttribute('disabled', 'true');
      section.setAttribute('disabled', 'false');
      this.active_section = section;

      if (button) {
        this.active_button.className = '';
        button.className = 'active';
        this.active_button = button;
      }
    }
  }
});
