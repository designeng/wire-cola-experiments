define(["underscore", "jquery", "./utils/validatePluginUtils"], function(_, $, ValidatePluginUtils) {
  var noop, pluginUtils;
  noop = function() {};
  pluginUtils = new ValidatePluginUtils();
  return function(options) {
    var validateFacet;
    validateFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var strategies, target;
        console.log("options", options);
        target = facet.target;
        strategies = pluginUtils.extractStrategies(options);
        return resolver.resolve();
      });
    };
    return {
      context: {
        destroy: function(resolver, wire) {
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
