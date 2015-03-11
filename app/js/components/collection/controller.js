define(["jquery", "underscore", "eventEmitter"], function($, _, EventEmitter) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.emitter = new EventEmitter();

    Controller.prototype.addSourceToOriginal = function(array) {
      return this.originalCollection.addSource(array);
    };

    Controller.prototype.onBunchData = function(data) {
      return console.debug("onBunchData", data);
    };

    Controller.prototype.onReady = function() {
      var _this = this;
      console.debug("emitter:::", this.emitter);
      setTimeout(function() {
        return _this.twoTrigger();
      }, 300);
      return setTimeout(function() {
        return _this.oneTrigger();
      }, 600);
    };

    Controller.prototype.onCollectionFiltered = function() {};

    Controller.prototype.oneTrigger = function() {
      console.debug("oneTrigger invoked");
      return {
        name: "oneTrigger",
        value: 123
      };
    };

    Controller.prototype.twoTrigger = function() {
      console.debug("twoTrigger invoked");
      return {
        name: "twoTrigger",
        value: 123
      };
    };

    return Controller;

  })();
});
