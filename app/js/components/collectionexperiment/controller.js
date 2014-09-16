define(["jquery", "underscore"], function($, _) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {
      return _.bindAll(this, "locationHandler");
    };

    Controller.prototype.isElement = function(obj) {
      var e;
      try {
        return obj instanceof HTMLElement;
      } catch (_error) {
        e = _error;
        return (typeof obj === "object") && (obj.nodeType === 1) && (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
      }
    };

    Controller.prototype.clicked = function(e) {
      var data;
      data = $(e.target).closest('li').attr('data-underscore-id');
      return console.log("CLICKED:", data);
    };

    Controller.prototype.locationHandler = function(node, data, info) {
      return $(node).text(data.location);
    };

    Controller.prototype.eachHandler = function(node, data, info) {
      return console.log(node);
    };

    Controller.prototype.allHandler = function(node, data, info) {};

    Controller.prototype.liClicked = function(e) {
      return console.log("CLICKED:::::", e);
    };

    return Controller;

  })();
});
