define(["underscore", "jquery", "when", "./utils/colaway/form"], function(_, $, When, FormUtil) {
  var $target, createStrategy, doValidate, inputs, inputsPromises, noop, pointsToArray, unbindAll;
  $target = null;
  inputs = [];
  inputsPromises = [];
  unbindAll = function() {
    var input, _i, _len;
    for (_i = 0, _len = inputs.length; _i < _len; _i++) {
      input = inputs[_i];
      input.unbind();
    }
    return $target.unbind();
  };
  noop = function() {};
  pointsToArray = function(points) {
    return _.values(points);
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
    var validateFacet;
    validateFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var fieldName, fieldPoints, input, inputValidationStrategyPromise, target, validate, _ref;
        target = facet.target;
        $target = $(target);
        _ref = options.fields;
        for (fieldName in _ref) {
          fieldPoints = _ref[fieldName];
          input = $target.find("input[name='" + fieldName + "']");
          inputs.push(input);
          inputValidationStrategyPromise = createStrategy(pointsToArray(fieldPoints));
          inputsPromises.push({
            name: fieldName,
            promise: inputValidationStrategyPromise
          });
          input.bind("change", (function(fieldName) {
            return function(e) {
              var all, promise;
              console.log(e.target.value);
              promise = _.where(inputsPromises, {
                name: fieldName
              });
              console.log("PROMISE:::", promise);
              return all = When.all(promise).then(function(res) {
                return console.log("SUCCESS", res);
              });
            };
          })(fieldName));
        }
        validate = function() {
          var obj;
          obj = FormUtil.getValues(target);
          console.log("OBJ:::", obj);
          return false;
        };
        $target.bind("submit", validate);
        return resolver.resolve();
      });
    };
    return {
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
  };
});
