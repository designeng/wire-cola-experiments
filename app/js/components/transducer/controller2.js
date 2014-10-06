define(["underscore", "when", "when/sequence"], function(_, When, sequence) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {
      var doValidate, errorHandler, points, pointsToArray, successHandler;
      points = {
        "one": {
          rule: function(value) {
            console.log("ONE", value);
            if (value > 5) {
              return false;
            } else {
              return true;
            }
          },
          message: "message_1: not more then"
        },
        "two": {
          rule: function(value) {
            console.log("TWO", value);
            if (value < 0) {
              return false;
            } else {
              return true;
            }
          },
          message: "message_2: not less then"
        }
      };
      pointsToArray = function(points) {
        return _.values(points);
      };
      doValidate = function(value, points, successHandler, errorHandler) {
        var item, _i, _len, _ref;
        _ref = pointsToArray(points);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item.rule(value)) {
            continue;
          } else {
            errorHandler(item.message);
            return;
          }
        }
        return successHandler();
      };
      successHandler = function(result) {
        return console.log("successHandler::::", result);
      };
      errorHandler = function(message) {
        return console.log("errorHandler::::", message);
      };
      return doValidate(3, points, successHandler, errorHandler);
    };

    return Controller;

  })();
});
