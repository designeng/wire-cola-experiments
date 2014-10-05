define(["underscore", "when"], function(_, When) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {
      var doValidate, errorHandler, extract, filter, points, pointsToArray, successHandler;
      points = {
        "one": {
          rule: function(value) {
            if (value > 5) {
              return false;
            } else {
              return true;
            }
          },
          message: "message_1"
        },
        "two": {
          rule: function(value) {
            if (value < 0) {
              return false;
            } else {
              return true;
            }
          },
          message: "message_2"
        }
      };
      pointsToArray = function(points) {
        return _.values(points);
      };
      extract = function(points) {
        var item, result, ruleWithMessage, throwErrorIfNotValid, _i, _len, _ref;
        result = [];
        _ref = pointsToArray(points);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          throwErrorIfNotValid = function(isValid) {
            console.log("isValid:::", isValid);
            if (!isValid) {
              throw new Error(item.message);
            } else {
              return 1;
            }
          };
          ruleWithMessage = _.compose(throwErrorIfNotValid, item.rule);
          result.push(ruleWithMessage);
        }
        return result;
      };
      filter = function(value) {
        return function(result, rule) {
          var res;
          res = rule(value);
          if (res) {
            return result += " 1";
          } else {
            return result += " 0";
          }
        };
      };
      doValidate = function(value, points, successHandler, errorHandler) {
        var error, validationResult;
        try {
          validationResult = _.reduce(extract(points), filter(value), "start");
          return successHandler(validationResult);
        } catch (_error) {
          error = _error;
          return errorHandler(error.message);
        }
      };
      successHandler = function(result) {
        return console.log("successHandler::::", result);
      };
      errorHandler = function(message) {
        return console.log("errorHandler::::", message);
      };
      return doValidate(10, points, successHandler, errorHandler);
    };

    return Controller;

  })();
});
