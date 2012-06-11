// Generated by CoffeeScript 1.3.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['environ', 'mediator', 'jquery', 'underscore', 'backbone'], function(environ, mediator, $, _, Backbone) {
  var AppArea;
  AppArea = (function(_super) {

    __extends(AppArea, _super);

    function AppArea() {
      this.updateCount = __bind(this.updateCount, this);
      return AppArea.__super__.constructor.apply(this, arguments);
    }

    AppArea.prototype.initialize = function() {};

    AppArea.prototype.load = function() {
      this.$uniqueCount = $('<span class=stat></span>');
      mediator.subscribe('datacontext/change', this.updateCount);
      App.DataContext.deferred.done(this.updateCount);
      return $('#subnav .nav.pull-left:first').append($('<li>').html(this.$uniqueCount));
    };

    AppArea.prototype.updateCount = function() {
      var count, pretty;
      count = App.DataContext.session.get('count');
      pretty = App.utils.intword(count);
      return this.$uniqueCount.text(pretty).attr('title', App.utils.intcomma(count));
    };

    return AppArea;

  })(Backbone.View);
  return App.register(false, 'app', new AppArea);
});