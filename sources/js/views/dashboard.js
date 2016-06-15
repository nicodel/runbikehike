/* jshint browser: true */
/* globals Backbone, Factory, Dashboard, Messages, Sessions, Body */
/* exported DashboardView */
'use strict';

var DashboardView = Backbone.NativeView.extend({
  el: '#dashboard',

  events: {
    'click .session-summary-click'  : 'itemSelected'
  },

  viewsList: [],
  sortAscending: false,
  sortAttribute: 'date',

  initialize: function() {
    // console.log('DASHBOARD VIEW - initialize');
    this.collection = Dashboard;
    // this.collection.reset();

    this.listenTo(Messages, 'sync', this.resync);
    this.listenTo(Sessions, 'sync', this.resync);
    // this.listenTo(Body, 'sync', this.resync);

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'dashboard-entry-selected', this.showEntry);
    this.listenTo(this.collection, 'sessions-entry-selected', this.showSession);
    // this.listenTo(this.collection, 'sort-it');
    // this.listenTo(this.collection, 'all', function(a, b) {console.log('DASHBOARD - this.collection', a, b);});
    var that = this;
    document.getElementById('dashboard-sort-attribute').addEventListener('change', function(ev) {
      that.sortAttribute = ev.target.value;
      that.sortCollection();
    });
    document.getElementById('dashboard-sort-ascending').addEventListener('change', function(ev) {
      that.sortAscending = ev.target.value;
      that.sortCollection();
    });
    // this.collection.fetch();
    this.sortCollection();
  },

  resync: function (ev, res) {
    this.collection.reset();
    Messages.forEach(function (item) {
      this.collection.add(item);
    }, this);
    Sessions.forEach(function (item) {
      this.collection.add(item);
    }, this);
    this.render();
  },

  sortCollection: function() {
    var that = this;
    this.collection.comparator = function(doc) {
      // console.log('sorting collection', doc);
      var activity = doc.get('activity');
      var timestamp = doc.get('date');

      if (!that.sortAscending) {
        if (that.sortAttribute === 'date') {
          return that.negateString(timestamp);
        }
        if (that.sortAttribute === 'activity') {
          return that.negateString(that.negateString(activity) + "-" + that.negateString(timestamp));
        }
      } else {
        if (that.sortAttribute === 'date') {
          return timestamp;
        }
        if (that.sortAttribute === 'activity') {
          return that.negateString(activity) + "-" + timestamp;
        }
      }
    };
    this.collection.sort();
    // console.log('collection will be sorted');
    this.render();
  },

  negateString: function(s) {
    s = s.toLowerCase();
    s = s.split("");
    s = s.map(function(letter) {
      return String.fromCharCode(-(letter.charCodeAt(0)));
    });
    return s.join("");
  },

  addEntry: function() {
    // console.log('DASHBOARDVIEW - addEntry');
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    var view = Factory.getDashboardSummaryView(item);
    this.listenTo(view, 'dashboard-item-selected', this.itemSelected);
    this.el.appendChild(view.render().el);
    this.viewsList.push(view);
  },

  render: function() {
    console.log('dashboard view render', this.collection);
    if (this.el.innerHTML !== '') {
      this.viewsList.forEach(function(view) {
        view.remove();
      });
      this.viewsList = [];
    }
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);
  },

  itemSelected: function(item) {
    var entry_cid = item.target.getAttribute('session_id');
    // console.log('click dashboard', item.target);
    this.viewsList.forEach(function(view) {
        console.log('clicked', view.model.cid);
      if (view.model.cid === entry_cid) {
        this.collection.trigger('dashboard-entry-selected', view.model);
      }
    }, this);
  },

  showEntry: function(model) {
    console.log('dashboard entry selected', model);
    var type = model.get('type');
    if (type === 'session') {
      this.showSession(model);
    } else if(type === 'body'){
      this.detailled_view = Factory.getDetailledView(model);
      this._viewSection(this.dom.session_view, this.dom.session_btn);
    } else {
      console.log('other types of dashboard entries are not managed');
    }
  },
});
