define(["jquery", "underscore"], function($, _) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {
      return console.log("townsViewTemplate::::", this.townsViewTemplate);
    };

    return Controller;

  })();
});
