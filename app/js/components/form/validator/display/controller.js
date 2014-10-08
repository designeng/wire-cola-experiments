define(["underscore", "jquery", "when"], function(_, $, When) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {
      return this.display = this.normalize(this.display);
    };

    Controller.prototype.normalize = function(view) {
      return $(view);
    };

    Controller.prototype.displayError = function(error) {
      if (!error.message) {
        this.display.hide();
      } else {
        this.display.show();
        return this.display.html(_.reduce(error, function(content, text) {
          return content += "<li>" + text + "</li>";
        }, ""));
      }
    };

    return Controller;

  })();
});
