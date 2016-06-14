/* globals _, Backbone, Session */
/* exported Sessions */
'use strict';

var SessionsCollection = Backbone.Collection.extend({
  model: Session,
  url: '/sessions'
});
var Sessions = new SessionsCollection();
