define(["jquery"], function($) {
  return function(options) {
    var bySelectorFactory, pluginInstance;
    bySelectorFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(formElement) {
        return resolver.resolve(formElement);
      });
    };
    pluginInstance = {
      factories: {
        bySelector: bySelectorFactory
      }
    };
    return pluginInstance;
  };
});
