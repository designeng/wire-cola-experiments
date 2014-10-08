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

    Controller.prototype.displayError = function(name, error) {
      var messages;
      console.log("ERROR:::::::", name, error);
      if (!error.messages) {
        console.log(name, "NO ERRORS");
        return this.display.hide();
      } else {
        messages = _.flatten(error.messages);
        console.log("messages>>>>>>>", messages);
        this.display.html(_.reduce(messages, function(content, text) {
          content += "<li>" + text + "</li>";
          console.log("content::::", content);
          return content;
        }, ""));
        return this.display.show();
      }
    };

    return Controller;

  })();
});
