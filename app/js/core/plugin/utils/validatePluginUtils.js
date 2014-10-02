define(["when", "when/sequence", "underscore", "jquery", "./form"], function(When, sequence, _, $, FormUtil) {
  var ValidatePluginUtils;
  return ValidatePluginUtils = (function() {
    function ValidatePluginUtils() {}

    ValidatePluginUtils.prototype.target = null;

    ValidatePluginUtils.prototype.$target = null;

    ValidatePluginUtils.prototype.defaultInputEvent = "change";

    ValidatePluginUtils.prototype.normalizeTarget = function(target) {
      if (target instanceof jQuery) {
        return target;
      } else {
        this.target = target;
        return $(target);
      }
    };

    ValidatePluginUtils.prototype.registerTarget = function(target) {
      this.$target = this.normalizeTarget(target);
      return this.$target;
    };

    ValidatePluginUtils.prototype.unregisterTarget = function() {
      return this.$target.unbind();
    };

    ValidatePluginUtils.prototype.defaultInputHandler = function(options) {
      var inputEvent;
      return inputEvent = options.event || this.defaultInputEvent;
    };

    ValidatePluginUtils.prototype.setInputHandler = function(name, handler) {
      var $input;
      $input = this.$target.find("[name='" + name + "']");
      handler = handler || this.defaultInputHandler();
      return $input.bind(defaultInputEvent, handler);
    };

    ValidatePluginUtils.prototype.getAllInputs = function() {
      var inputs;
      return inputs = this.$target.each(function() {
        return $(this).filter(':input');
      });
    };

    ValidatePluginUtils.prototype.formElementFinder = function(rootNode, nodeName) {
      if (rootNode.elements && rootNode.elements.length) {
        return rootNode.elements[nodeName];
      }
    };

    ValidatePluginUtils.prototype.getFormElementValue = function(form, name) {
      return form.elements[name].value;
    };

    ValidatePluginUtils.prototype.getAllFormValues = function(form) {
      console.log("@form:::", form);
      return FormUtil.getValues(form);
    };

    ValidatePluginUtils.prototype.normalizeRule = function(rule) {
      var ruleFunction;
      if (_.isFunction(rule)) {
        return rule;
      } else if (_.isRegExp(rule)) {
        return ruleFunction = function(value) {
          if (typeof value !== "undefined") {
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

    ValidatePluginUtils.prototype.toPromise = function(func, message) {
      var promise;
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

    ValidatePluginUtils.prototype.normalizeStrategyItem = function(item) {
      var func, _item;
      func = this.normalizeRule(item.rule);
      _item = {};
      _item.rule = this.toPromise(func, item.message);
      return _item;
    };

    ValidatePluginUtils.prototype.normalizeStrategyItemsArray = function(array) {
      var _this = this;
      return _.map(array, function(item) {
        return _this.normalizeStrategyItem(item);
      });
    };

    ValidatePluginUtils.prototype.getRulesArray = function(array) {
      var _this = this;
      return _.map(array, function(item) {
        return item.rule;
      });
    };

    ValidatePluginUtils.prototype.validate = function(extracted, valuesInArray) {
      return sequence(extracted).then(function(res) {
        return console.log("RES::", res);
      }, function(err) {
        return console.log("ERR:::", err);
      });
    };

    return ValidatePluginUtils;

  })();
});
