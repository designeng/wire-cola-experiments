define(["underscore", "jquery", "when", "./utils/colaway/form"], function(_, $, When, FormUtil) {
  var createStrategy, getInputStrategy, noop, normalizePoints, normalizeRule, pluginObject, pointsToArray, refresh, registerInput, registerInputHandler, registerInputStrategy, registerTarget, registerTargetHandler, targetRegistrator, unbindAll;
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
  registerInput = function(targetName, inputName, input) {
    if (!targetRegistrator[targetName]["inputs"]) {
      targetRegistrator[targetName]["inputs"] = {};
    }
    return targetRegistrator[targetName]["inputs"][inputName] = input;
  };
  registerInputHandler = function(targetName, inputName, event, handler) {
    return targetRegistrator[targetName]["inputs"][inputName].bind(event, handler);
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
  createStrategy = function(array) {
    var item, result, rulePromise, ruleWithMessage, validationPromise, _i, _len;
    result = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      rulePromise = function(isValid) {
        var promise;
        console.log("isValid:::", isValid);
        promise = When.promise(function(resolve, reject) {
          if (isValid) {
            return resolve();
          } else {
            return reject();
          }
        });
        return promise;
      };
      ruleWithMessage = _.compose(rulePromise, item.rule);
      result.push(ruleWithMessage);
    }
    validationPromise = When.all(result);
    return validationPromise;
  };
  return function(options) {
    var validateFacet, wireFacetOptions;
    validateFacet = function(resolver, facet, wire) {
      return wireFacetOptions(resolver, facet, wire);
    };
    wireFacetOptions = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var fieldName, fieldPoints, input, registred, target, targetName, validateForm, validateInputValue, _ref;
        target = facet.target;
        registred = registerTarget(target);
        targetName = registred.targetName;
        _ref = options.fields;
        for (fieldName in _ref) {
          fieldPoints = _ref[fieldName];
          input = registred["$target"].find("input[name='" + fieldName + "']");
          registerInput(targetName, fieldName, input);
          registerInputStrategy(targetName, {
            name: fieldName,
            points: fieldPoints
          });
          validateInputValue = (function(fieldName, targetName) {
            return function(e) {
              var iterator, result, strategy, strategyPoints;
              console.log(e.target.value);
              strategy = getInputStrategy(targetName, fieldName);
              strategyPoints = _.values(strategy.points);
              console.log("strategyPoints:::", strategyPoints);
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
              })(e.target.value);
              result = _.reduce(strategyPoints, iterator, {});
              return console.log("processing res:::::", result);
            };
          })(fieldName, targetName);
          registerInputHandler(targetName, fieldName, "change", validateInputValue);
        }
        validateForm = (function(targetName) {
          return function() {
            var obj;
            obj = FormUtil.getValues(target);
            console.log("OBJ:::", obj, targetName);
            if (options.pluginInvoker) {
              options.pluginInvoker(pluginObject, target, refresh);
            }
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
