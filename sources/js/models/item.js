/* globals Backbone */
'use strict';
var RBH = RBH || {};
RBH.Models = RBH.Models || {};

RBH.Models.Item = Backbone.Model.extend({
    idAttribute: '_id',
    save: false
});
