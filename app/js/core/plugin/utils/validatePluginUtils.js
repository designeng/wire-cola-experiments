define(["when", "underscore", "jquery"], function(When, _, $) {
  var ValidatePluginUtils;
  return ValidatePluginUtils = (function() {
    function ValidatePluginUtils() {}

    ValidatePluginUtils.prototype.getFormElementValue = function(form, name) {
      return form.elements[name].value;
    };

    ValidatePluginUtils.prototype.normalizeRule = function(rule) {
      var ruleFunction;
      if (_.isFunction(rule)) {
        return rule;
      } else if (_.isRegExp(rule)) {
        return ruleFunction = function(value) {
          if (value) {
            return String.prototype.match.call(value, rule);
          } else {
            return false;
          }
        };
      }
    };

    ValidatePluginUtils.prototype.extractStrategies = function(options) {
      var name, strategies, _ref, _strategies;
      _strategies = [];
      _ref = options.fields;
      for (name in _ref) {
        strategies = _ref[name];
        _strategies.push(_.values(strategies)[0]);
      }
      return _strategies;
    };

    ValidatePluginUtils.prototype.normalizeStrategyItem = function(item) {
      var func;
      func = this.normalizeRule(item.rule);
      console.log("func:::::::", func);
      item.rule = this.toPromise(func, item.message);
      return item;
    };

    ValidatePluginUtils.prototype.normalizeArray = function(array) {
      var _this = this;
      return _.map(array, function(item) {
        return _this.normalizeStrategyItem(item);
      });
    };

    ValidatePluginUtils.prototype.toPromise = function(func, message) {
      var promise;
      console.log("FUNC:::", func);
      promise = When.promise(function(resolve, reject, notify) {
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

    ValidatePluginUtils.prototype.pipelineStrategies = function(strategies) {
      var strategy, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = strategies.length; _i < _len; _i++) {
        strategy = strategies[_i];
        _results.push(console.log("strategy::::::::::", strategy));
      }
      return _results;
    };

    return ValidatePluginUtils;

  })();
});
