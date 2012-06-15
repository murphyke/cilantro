var __hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};define(["environ","mediator","underscore","backbone"],function(environ,mediator,_,Backbone){var Preferences;return Preferences=function(_super){function Preferences(){return Preferences.__super__.constructor.apply(this,arguments)}return __extends(Preferences,_super),Preferences.prototype.url=environ.absolutePath("/api/preferences/"),Preferences.prototype.defaults={session:{}},Preferences.prototype.initialize=function(){var _this=this;mediator.subscribe("session/save",function(key,data){var session;return session=_this.get("session"),session[key]=data,_this.save({session:session})})},Preferences.prototype.load=function(){var data,key,_ref;_ref=this.attributes.session;for(key in _ref)data=_ref[key],mediator.publish("session/load/"+key,data)},Preferences}(Backbone.Model),App.preferences=new Preferences(App.preferences)})