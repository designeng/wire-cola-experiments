define(["underscore"], function(_) {
  var ErrorStorage;
  return ErrorStorage = (function() {
    function ErrorStorage() {
      this.storage = {};
    }

    ErrorStorage.prototype.getValue = function(name) {
      return {
        name: name,
        messages: this.storage[name]
      };
    };

    ErrorStorage.prototype.setValue = function(name, messages) {
      return this.storage[name] = messages;
    };

    return ErrorStorage;

  })();
});
