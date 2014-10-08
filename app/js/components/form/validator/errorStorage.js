define(["underscore"], function(_) {
  var ErrorStorage;
  return ErrorStorage = (function() {
    function ErrorStorage() {
      this.storage = {};
    }

    ErrorStorage.prototype.getValue = function(name) {
      return {
        name: name,
        message: this.storage[name]
      };
    };

    ErrorStorage.prototype.setValue = function(name, message) {
      return this.storage[name] = message;
    };

    return ErrorStorage;

  })();
});
