define(["underscore", "jquery", "./utils/validatePluginUtils"], function(_, $, ValidatePluginUtils) {
  var $target, noop;
  $target = null;
  noop = function() {};
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
        pluginUtils.validate(extracted);
        errors = [];
        validate = function() {
          var obj;
          obj = pluginUtils.getAllFormValues(target);
          console.log("FORM -> OBJ:::", obj);
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
