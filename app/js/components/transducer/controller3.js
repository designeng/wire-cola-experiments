define(["underscore", "when"], function(_, When) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.onReady = function() {
      var doValidate, errorHandler, extract, points, pointsToArray, successHandler;
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
            var promise;
            console.log("isValid:::", isValid);
            return promise = When.promise(function(resolve, reject) {
              if (isValid) {
                return resolve();
              } else {
                return reject();
              }
            });
          };
          ruleWithMessage = _.compose(throwErrorIfNotValid, item.rule);
          result.push(ruleWithMessage);
        }
        return result;
      };
      doValidate = function(value, points, successHandler, errorHandler) {
        var validationPromise;
        validationPromise = When.all(extract(points));
        return validationPromise.then(successHandler, errorHandler);
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
