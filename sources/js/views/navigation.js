/* jshint browser: true */
/* globals Backbone, Factory, Session, BodyWeight, Preferences, Sessions, BodyWeights, Dashboard,
   PreferencesView, NewSession, NewBodyWeightView */
/* exported NavigationView */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.Navigation = Backbone.NativeView.extend({
  el: 'nav',
  events: {
    'click #new-session-btn'  : 'showNewSession',
    'click #new-body-weight-btn'     : 'showNewBodyWeight',
    'click #dashboard-btn'    : 'showDashboard',
    'click #sessions-btn'     : 'showSessions',
    'click #reports-btn'      : 'showReports',
    'click #preferences-btn'  : 'showPreferences'
  },
  dom: {
    dashboard_view        : document.getElementById('dashboard-view'),
    session_view          : document.getElementById('session-view'),
    new_session_view      : document.getElementById('new-session-view'),
    new_body_weight_view  : document.getElementById('new-body-weight-view'),
    sessions_view         : document.getElementById('sessions-view'),
    reports_view          : document.getElementById('reports-view'),
    preference_view       : document.getElementById('preferences-view'),
    dashboard_btn         : document.getElementById('dashboard-btn'),
    new_session_btn       : document.getElementById('new-session-btn'),
    new_body_weight_btn   : document.getElementById('new-body-weight-btn'),
    sessions_btn          : document.getElementById('sessions-btn'),
    reports_btn           : document.getElementById('reports-btn'),
    preference_btn        : document.getElementById('preferences-btn')
  },
  detailled_view: '',

  initialize: function () {
    this.active_section = this.dom.dashboard_view;
    this.active_button = this.dom.dashboard_btn;

    this.listenTo(Dashboard, 'dashboard-entry-selected', this.showEntry);
    this.listenTo(Dashboard, 'sessions-entry-selected', this.showSession);
    this.listenTo(Sessions, 'add-new', this.showSession);
    this.listenTo(Sessions, 'removed', this.showDashboard);
    this.listenTo(BodyWeights, 'add-new', this.showDashboard);
  },

  showNewSession: function() {
    // new NewSession({
    //   model: new Session()
    // });
    this._viewSection(this.dom.new_session_view, this.dom.new_session_btn);
  },

  showNewBodyWeight: function() {
    console.log('showNewBody');
    new NewBodyWeightView({
      model: new BodyWeight({
        date: new Date(),
        weight: 0
      })
    });
    this._viewSection(this.dom.new_body_weight_view, this.dom.new_body_weight_btn);
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

  showSession: function(model) {
    // TODO instead of fetching session model (there is no more partial send), I need to fetch the GPS track corresponding, if it is True
    /*
    if model.get('gps_track').available is True
      model.fetch({
        'id': model.get('gps_track').id,
        'success': {},
        'error':  {}
      })
    */
    console.log('MAIN - will display model', model);
    var that = this;
    model.fetch({
      success : function(mod, res) {
        // console.log('that.detailled_view', that.detailled_view);
        var View;
        that._viewSection(that.dom.session_view, that.dom.session_btn);
        var views = Factory.getDetailsSessionView(mod);
        new Session({
          'model' : mod,
          'views' : views
        }).render();
      },
      error   : function(model, response) {
        console.log('error', model, response);
      }
    });
  },

  showEntry: function(model) {
    console.log('dashboard entry selected', model);
    if (model.get('docType') === 'sessions') {
      this.showSession(model);
    } else if (model.get('docType') === 'messages'){
      // TODO display messgaes details
      console.log('detailled messages are not displayed yet');
    }
    /*if (model.get('weight')) {
      this.detailled_view = Factory.getWeightView(model);
      this._viewSection(this.dom.session_view, this.dom.session_btn);
    } else if (model.get('type') === 'session') {
        this.showSession(model);
    }*/
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
