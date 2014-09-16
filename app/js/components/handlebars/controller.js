define(["jquery", "underscore"], function($, _) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {};

    Controller.prototype.onClick = function(e) {
      var data;
      data = $(e.target).closest('li').attr('data-handlebars-id');
      if (data) {
        return console.log("CLICKED UPLEVEL ITEM:", data);
      }
    };

    Controller.prototype.onClickInner = function(e) {
      return console.log("inner element clicked");
    };

    return Controller;

  })();
});
