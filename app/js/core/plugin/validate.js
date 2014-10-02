define(["underscore", "jquery", "./utils/validatePluginUtils"], function(_, $, ValidatePluginUtils) {
  var $target, doValidate, noop;
  $target = null;
  noop = function() {};
  doValidate = function(obj, validationFunc, structure) {
    console.log("structure:::", structure);
    return validationFunc(structure, obj);
  };
  return function(options) {
    var validateFacet;
    validateFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var errors, extracted, pluginUtils, target, validate;
        console.log("options", options);
        target = facet.target;
        pluginUtils = new ValidatePluginUtils(target);
        $target = pluginUtils.registerTarget(target);
        pluginUtils.getAllInputs();
        extracted = pluginUtils.extractStrategies(options);
        extracted = pluginUtils.normalizeStrategyItemsArray(extracted);
        extracted = pluginUtils.getRulesArray(extracted);
        errors = [];
        validate = function() {
          var obj, promise;
          obj = pluginUtils.getAllFormValues(target);
          console.log("FORM -> OBJ:::", obj);
          promise = pluginUtils.validate(extracted);
          if (options.afterValidation != null) {
            options.afterValidation(target, errors);
          }
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
          pluginUtils.unregisterTarget();
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
