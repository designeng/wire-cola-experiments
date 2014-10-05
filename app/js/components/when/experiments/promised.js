define(["underscore", "when", "when/function", "when/pipeline", "when/sequence"], function(_, When, fn, pipeline, sequence) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.validationOptions = {
      fields: {
        firstName: {
          "not longer than 20 characters": {
            rule: function(value) {
              if (value.length > 20) {
                return false;
              } else {
                return true;
              }
            },
            message: "Should not be longer than 20 characters!"
          }
        },
        email: {
          "should have word '@'": {
            rule: /@/g,
            message: "Should have word '@'!"
          }
        }
      }
    };

    Controller.prototype.extractStrategies = function(options) {
      var name, strategies, _ref, _strategies;
      _strategies = [];
      _ref = options.fields;
      for (name in _ref) {
        strategies = _ref[name];
        _strategies.push(_.values(strategies)[0]);
      }
      return _strategies;
    };

    Controller.prototype.ruleToPromiseArray = function() {
      var toPromise;
      toPromise = function(func, message) {
        var promise;
        promise = When.promise(function(resolve, reject) {
          var isValid;
          isValid = func();
          if (isValid) {
            return resolve(true);
          } else {
            return reject(message);
          }
        });
        return promise;
      };
      return console.log(this.extractStrategies(this.validationOptions));
    };

    Controller.prototype.wrapFunc = function() {
      var composedRule, rule, verdict;
      rule = function(value) {
        if (value.length > 20) {
          return false;
        } else {
          return true;
        }
      };
      verdict = function(isValid) {
        if (!isValid) {
          return message;
        } else {
          return value;
        }
      };
      composedRule = _.compose(rule, verdict);
      return composedRule(value, rule, message);
    };

    return Controller;

  })();
});
