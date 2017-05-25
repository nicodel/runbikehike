/* jshint browser: true */
/* globals Backbone */
'use strict';

var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.Dashboard = Backbone.NativeView.extend({
  el: '#dashboard',

  events: {
    'click .session-summary-click'  : 'itemSelected'
  },

  viewsList: [],
  sortAscending: false,
  sortAttribute: 'date',

  sortIt: function (ev, res) {
    // console.log('sortIt', ev, res);
  },

  initialize: function() {
    // console.log('DASHBOARD VIEW - initialize');
    this.collection = RBH.Collections.Dashboard;
    // this.collection.reset();

    // this.listenTo(RBH.Collections.Messages, 'sync', this.resync);
    this.listenTo(RBH.Collections.Sessions, 'sync', this.resync);
    // this.listenTo(RBH.Collections.BodyWeights, 'sync', this.resync);

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'reset', this.render);

    this.listenTo(this.collection, 'sort-it');
    // this.listenTo(this.collection, 'all', function(a, b) {console.log('DASHBOARD - this.collection', a, b);});

    var that = this;
    document.getElementById('dashboard-sort-attribute').addEventListener('change', function(ev) {
      that.sortAttribute = ev.target.value;
      that.sortCollection();
    });
    document.getElementById('dashboard-sort-ascending').addEventListener('change', function(ev) {
      if (ev.target.value === 'false') {
        that.sortAscending = false;
      } else {
        that.sortAscending = true;
      }
      that.sortCollection();
    });

    this.sortCollection();
  },

  resync: function (ev, res) {
    this.collection.reset();
    // RBH.Collections.Messages.forEach(function (item) {
    //   this.collection.add(item);
    // }, this);
    // console.log('RBH.collections.Sessions', RBH.Collections.Sessions);
    RBH.Collections.Sessions.forEach(function (item) {
      this.collection.add(item);
    }, this);
    // RBH.Collections.BodyWeights.forEach(function (item) {
    //   this.collection.add(item);
    // }, this);
    this.sortCollection();
  },

  sortCollection: function() {
    // console.log('sorting collection', this.collection);
    if (this.collection.length !== 0) {
      var that = this;
      // console.log('sorting collection by', this.sortAttribute, this.sortAscending);
      this.collection.comparator = function(doc) {
        var activity = doc.get('activity_name');
        var timestamp = doc.get('date');
        // console.log('sortCollection', activity, timestamp);
        if (!that.sortAscending) {
          if (that.sortAttribute === 'date') {
            return that.negateString(timestamp);
          } else if (that.sortAttribute === 'activity_name') {
            return that.negateString(that.negateString(activity) + "-" + that.negateString(timestamp));
          }
        } else {
          if (that.sortAttribute === 'date') {
            return timestamp;
          } else if (that.sortAttribute === 'activity_name') {
            return that.negateString(activity) + "-" + timestamp;
          }
        }
      };
      this.collection.sort();
      // console.log('collection has been sorted', this.collection);
      this.render();
    }
  },

  negateString: function(s) {
    if (typeof s === 'string' || s instanceof String) {
      s = s.toLowerCase();
      s = s.split("");
      s = s.map(function(letter) {
        return String.fromCharCode(-(letter.charCodeAt(0)));
      });
      return s.join("");
    } else {
      return null;
    }
  },

  addEntry: function() {
    // console.log('DASHBOARDVIEW - addEntry');
    this.collection.forEach(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    // console.log('item', item);
    var View;
    // if (item.get('docType') === 'sessions') {
    if (item.get('docType') === 'sessions') {
    View = RBH.Factory.getDashboardSessionViews(item);
      this.el.appendChild(View.render().el);
    } else if(item.get('docType') === 'messages') {
      View = RBH.Factory.getDashboardMessageView(item);
      this.el.appendChild(View.render().el);
    }
    // console.log('View', View);
    this.listenTo(View, 'dashboard-item-selected', this.itemSelected);
    this.viewsList.push(View);
  },

  render: function() {
    if (this.collection.length !== 0) {
      // console.log('dashboard view render', this.collection);
      if (this.el.innerHTML !== '') {
        this.viewsList.forEach(function(view) {
          view.remove();
        });
        this.viewsList = [];
      }
      this.collection.forEach(function(item) {
        this.renderItem(item);
      }, this);
    }
  },

  itemSelected: function(item) {
    var entry_cid = item.target.getAttribute('session_id');
    // console.log('click dashboard', item.target);
    this.viewsList.forEach(function(view) {
        // console.log('clicked', view.model.cid);
      if (view.model.cid === entry_cid) {
        // console.log('entry triggered');
        this.collection.trigger('dashboard-entry-selected', view.model);
      }
    }, this);
  }
});
