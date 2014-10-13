define(["underscore", "jquery"], function(_, $) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {
      this.display = this.normalize(this.display);
      return this.listRootNode = this.display.find("ul");
    };

    Controller.prototype.normalize = function(view) {
      return $(view);
    };

    Controller.prototype.displayError = function(obj) {
      var messages;
      if (!obj.error) {
        return this.display.hide();
      } else {
        messages = _.flatten(obj.error.messages);
        this.listRootNode.html(_.reduce(messages, function(content, text) {
          content += "<li>" + text + "</li>";
          return content;
        }, ""));
        this.display.addClass("layoutContent__errorDisplay__" + obj.name);
        console.log("@display HTML", this.display.html());
        return this.display.show();
      }
    };

    Controller.prototype.hideError = function() {
      return this.display.hide();
    };

    return Controller;

  })();
});
