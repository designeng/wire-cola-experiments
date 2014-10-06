define(["underscore", "jquery", "when", "./utils/colaway/form"], function(_, $, When, FormUtil) {
  var createStrategy, doValidate, getInputStrategy, noop, pluginObject, pointsToArray, refresh, registerInput, registerInputStrategy, registerTarget, targetRegistrator, unbindAll;
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
  registerInput = function(targetName, input) {
    if (!targetRegistrator[targetName]["inputs"]) {
      targetRegistrator[targetName]["inputs"] = [];
    }
    return targetRegistrator[targetName]["inputs"].push(input);
  };
  registerInputStrategy = function(targetName, inputStrategy) {
    if (!targetRegistrator[targetName]["strategies"]) {
      targetRegistrator[targetName]["strategies"] = [];
    }
    return targetRegistrator[targetName]["strategies"].push(inputStrategy);
  };
  getInputStrategy = function(targetName, fieldName) {
    return _.where(targetRegistrator[targetName]["strategies"], {
      name: fieldName
    })[0];
  };
  unbindAll = function() {
    var input, inputs, targetName, targetObject, _i, _j, _len, _len1, _results;
    _results = [];
    for (targetObject = _i = 0, _len = targetRegistrator.length; _i < _len; targetObject = ++_i) {
      targetName = targetRegistrator[targetObject];
      inputs = targetObject["inputs"];
      for (_j = 0, _len1 = inputs.length; _j < _len1; _j++) {
        input = inputs[_j];
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
  doValidate = function(obj, validationFunc, structure) {
    return validationFunc(structure, obj);
  };
  return function(options) {
    var validateFacet, wireFacetOptions;
    validateFacet = function(resolver, facet, wire) {
      return wireFacetOptions(resolver, facet, wire);
    };
    wireFacetOptions = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var fieldName, fieldPoints, input, predicate, registred, target, targetName, validate, _ref;
        target = facet.target;
        registred = registerTarget(target);
        targetName = registred.targetName;
        _ref = options.fields;
        for (fieldName in _ref) {
          fieldPoints = _ref[fieldName];
          input = registred["$target"].find("input[name='" + fieldName + "']");
          registerInput(targetName, input);
          registerInputStrategy(targetName, {
            name: fieldName,
            points: fieldPoints
          });
          predicate = function(value, index) {
            return console.log("predicate::::", value, index);
          };
          input.bind("change", (function(fieldName, targetName) {
            return function(e) {
              var promise, strategy, strategyPoints;
              console.log(e.target.value);
              strategy = getInputStrategy(targetName, fieldName);
              strategyPoints = _.values(strategy.points);
              return promise = When.filter(strategyPoints, predicate).then(function(res) {
                return console.log("SUCCESS", res);
              });
            };
          })(fieldName, targetName));
        }
        validate = function() {
          var obj;
          obj = FormUtil.getValues(target);
          console.log("OBJ:::", obj);
          if (options.pluginInvoker) {
            options.pluginInvoker(pluginObject, target, refresh);
          }
          return false;
        };
        registred["$target"].bind("submit", validate);
        if (options.pluginInvoker) {
          options.pluginInvoker(pluginObject, target, refresh);
        }
        return resolver.resolve();
      });
    };
    pluginObject = {
      context: {
        destroy: function(resolver, wire) {
          console.log("destroyed>>>>");
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
