define(["jquery", "underscore"], function($, _) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.addSourceToOriginal = function(array) {
      return this.originalCollection.addSource(array);
    };

    Controller.prototype.onReady = function() {
      var _this = this;
      return setTimeout(function() {
        return console.debug("documentTypesCollection", _this.documentTypesCollection.getSource());
      }, 1000);
    };

    Controller.prototype.onCollectionFiltered = function() {};

    return Controller;

  })();
});
