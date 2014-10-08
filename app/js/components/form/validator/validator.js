define(["underscore", "jquery", "when"], function(_, $, When) {
  var Validator;
  return Validator = (function() {
    function Validator() {}

    Validator.prototype.parsedStrategy = {};

    Validator.prototype.defaultPoint = {
      rule: function(value) {
        if (value === "") {
          return false;
        } else {
          return true;
        }
      },
      message: "Should not be empty!"
    };

    Validator.prototype.parseStrategy = function() {
      var fieldName, fieldPoints, _ref;
      _ref = this.strategy;
      for (fieldName in _ref) {
        fieldPoints = _ref[fieldName];
        fieldPoints = this.stuffFieldPointsWithDefault(fieldPoints);
        this.parsedStrategy[fieldName] = this.normalizePoints(fieldPoints);
      }
      return console.log("parsedStrategy::::::::", this.parsedStrategy);
    };

    Validator.prototype.validate = function(fieldName, value) {
      var iterator, points, result;
      value = $.trim(value);
      points = this.parsedStrategy[fieldName];
      iterator = function(result, item) {
        if (result.messages) {
          return result;
        } else {
          if (!item.rule(value)) {
            result["messages"] = [];
            result["messages"].push(item.message);
          }
          return result;
        }
      };
      result = _.reduce(points, iterator, {});
      console.log("result::::: for ", fieldName, "---", result);
      return result;
    };

    Validator.prototype.stuffFieldPointsWithDefault = function(fieldPoints) {
      fieldPoints[0] = this.defaultPoint;
      return fieldPoints;
    };

    Validator.prototype.normalizePoints = function(points) {
      var _this = this;
      points = _.map(points, function(item) {
        item.rule = _this.normalizeRule(item.rule);
        return item;
      });
      return points;
    };

    Validator.prototype.normalizeRule = function(rule) {
      if (_.isFunction(rule)) {
        return rule;
      } else if (_.isRegExp(rule)) {
        return function(value) {
          return value.match(rule);
        };
      }
    };

    return Validator;

  })();
});
