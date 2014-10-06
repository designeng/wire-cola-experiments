define(["underscore", "jquery", "when", "./utils/colaway/form"], function(_, $, When, FormUtil) {
  var checkTargetErrors, getInputStrategy, noop, normalizePoints, normalizeRule, pluginObject, pointsToArray, refresh, registerInput, registerInputHandler, registerInputStrategy, registerInputValidationResult, registerTarget, registerTargetHandler, targetRegistrator, unbindAll;
  pluginObject = null;
  targetRegistrator = {};
  registerTarget = function(target) {
    var $target, targetName;
    $target = $(target);
    targetName = $target.attr("name");
    if (!targetName) {
      throw new Error("Attribute 'name' must be defined for the form!");
    }
    if (!targetRegistrator[targetName]) {
      targetRegistrator[targetName] = {};
      targetRegistrator[targetName]["$target"] = $target;
    }
    return {
      $target: $target,
      targetName: targetName
    };
  };
  registerTargetHandler = function(targetName, event, handler) {
    return targetRegistrator[targetName]["$target"].bind("submit", handler);
  };
  registerInput = function(targetName, inputName, input, inputHandler) {
    if (!targetRegistrator[targetName]["inputs"]) {
      targetRegistrator[targetName]["inputs"] = {};
    }
    if (!targetRegistrator[targetName]["inputs"][inputName]) {
      targetRegistrator[targetName]["inputs"][inputName] = {};
    }
    targetRegistrator[targetName]["inputs"][inputName]["input"] = input;
    return targetRegistrator[targetName]["inputs"][inputName]["inputHandler"] = inputHandler;
  };
  registerInputHandler = function(targetName, inputName, event, handler) {
    return targetRegistrator[targetName]["inputs"][inputName]["input"].bind(event, handler);
  };
  normalizePoints = function(points) {
    points = _.map(points, function(item) {
      item.rule = normalizeRule(item.rule);
      return item;
    });
    return points;
  };
  normalizeRule = function(rule) {
    if (_.isFunction(rule)) {
      return rule;
    } else if (_.isRegExp(rule)) {
      return function(value) {
        return value.match(rule);
      };
    }
  };
  registerInputStrategy = function(targetName, inputStrategy) {
    if (!targetRegistrator[targetName]["strategies"]) {
      targetRegistrator[targetName]["strategies"] = [];
    }
    inputStrategy.points = normalizePoints(inputStrategy.points);
    return targetRegistrator[targetName]["strategies"].push(inputStrategy);
  };
  getInputStrategy = function(targetName, fieldName) {
    return _.where(targetRegistrator[targetName]["strategies"], {
      name: fieldName
    })[0];
  };
  registerInputValidationResult = function(targetName, inputName, result) {
    if (result.errors) {
      return targetRegistrator[targetName]["inputs"][inputName]["errors"] = result.errors;
    }
  };
  checkTargetErrors = function(targetName) {
    var input, inputHandler, inputs, key, keys, result, _i, _len;
    keys = _.keys(targetRegistrator[targetName]["inputs"]);
    inputs = targetRegistrator[targetName]["inputs"];
    result = {};
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      input = inputs[key]["input"];
      inputHandler = inputs[key]["inputHandler"];
      result = inputHandler(input.val());
      if (result.errors) {
        break;
      }
    }
    console.log("FORM VALIDATION RESULT:::::", result);
    return false;
  };
  unbindAll = function() {
    var input, inputName, targetName, targetObject, _ref, _results;
    _results = [];
    for (targetName in targetRegistrator) {
      targetObject = targetRegistrator[targetName];
      _ref = targetObject["inputs"];
      for (inputName in _ref) {
        input = _ref[inputName];
        input.unbind();
      }
      _results.push(targetObject["$target"].unbind());
    }
    return _results;
  };
  noop = function() {};
  pointsToArray = function(points) {
    return _.values(points);
  };
  refresh = function(val) {
    return console.log("refresh", val, targetRegistrator);
  };
  return function(options) {
    var validateFacet, wireFacetOptions;
    validateFacet = function(resolver, facet, wire) {
      return wireFacetOptions(resolver, facet, wire);
    };
    wireFacetOptions = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var fieldName, fieldPoints, input, inputHandler, registred, target, targetName, validateForm, _ref;
        target = facet.target;
        registred = registerTarget(target);
        targetName = registred.targetName;
        _ref = options.fields;
        for (fieldName in _ref) {
          fieldPoints = _ref[fieldName];
          input = registred["$target"].find("input[name='" + fieldName + "']");
          inputHandler = (function(fieldName, targetName) {
            return function(e) {
              var iterator, result, strategy, strategyPoints, _value;
              if (e.target) {
                _value = e.target.value;
              } else {
                _value = e;
              }
              strategy = getInputStrategy(targetName, fieldName);
              strategyPoints = _.values(strategy.points);
              iterator = (function(value) {
                return function(result, item) {
                  if (result.errors) {
                    return result;
                  } else {
                    if (!item.rule(value)) {
                      result["errors"] = [];
                      result["errors"].push(item.message);
                    }
                    return result;
                  }
                };
              })(_value);
              result = _.reduce(strategyPoints, iterator, {});
              registerInputValidationResult(targetName, fieldName, result);
              console.log("input processing res:::::", result);
              return result;
            };
          })(fieldName, targetName);
          registerInput(targetName, fieldName, input, inputHandler);
          registerInputStrategy(targetName, {
            name: fieldName,
            points: fieldPoints
          });
          registerInputHandler(targetName, fieldName, "change", inputHandler);
        }
        validateForm = (function(targetName) {
          return function() {
            checkTargetErrors(targetName);
            return false;
          };
        })(targetName);
        registerTargetHandler(targetName, "submit", validateForm);
        if (options.pluginInvoker) {
          options.pluginInvoker(pluginObject, target, refresh);
        }
        return resolver.resolve();
      });
    };
    pluginObject = {
      context: {
        destroy: function(resolver, wire) {
          unbindAll();
          return resolver.resolve();
        }
      },
      facets: {
        validate: {
          ready: validateFacet
        }
      }
    };
    return pluginObject;
  };
});
