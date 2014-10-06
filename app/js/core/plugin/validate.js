define(["underscore", "jquery", "./utils/colaway/bindingHandler", "./utils/colaway/form"], function(_, $, bindingHandler, FormUtil) {
  var $target, doValidate, noop, pointsToArray;
  $target = null;
  noop = function() {};
  pointsToArray = function(points) {
    return _.values(points);
  };
  doValidate = function(obj, validationFunc, structure) {
    return validationFunc(structure, obj);
  };
  return function(options) {
    var validateFacet;
    validateFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var errors, fieldName, fieldPoints, input, target, validate, _bindingHandler, _ref;
        target = facet.target;
        _bindingHandler = bindingHandler(target, options);
        _ref = options.fields;
        for (fieldName in _ref) {
          fieldPoints = _ref[fieldName];
          input = target.elements[fieldName];
          console.log(input);
        }
        errors = [];
        validate = function() {
          var obj;
          obj = FormUtil.getValues(target);
          console.log("OBJ:::", obj);
          return false;
        };
        $(target).bind("submit", validate);
        return resolver.resolve();
      });
    };
    return {
      context: {
        destroy: function(resolver, wire) {
          console.log("destroyed>>>>");
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
