define(["underscore", "jquery", "./utils/validatePluginUtils"], function(_, $, ValidatePluginUtils) {
  var $target, noop, pluginUtils;
  $target = null;
  noop = function() {};
  pluginUtils = new ValidatePluginUtils();
  return function(options) {
    var validateFacet;
    validateFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var errors, extracted, target, validate;
        console.log("options", options);
        target = facet.target;
        $target = $(target);
        extracted = pluginUtils.extractStrategies(options);
        extracted = pluginUtils.normalizeStrategyItemsArray(extracted);
        extracted = pluginUtils.getRulesArray(extracted);
        pluginUtils.validate(extracted);
        errors = [];
        validate = function() {
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
          $target.unbind();
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
