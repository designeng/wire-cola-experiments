define(["underscore", "jquery"], function(_, $) {
  return function(options) {
    var validateFacet;
    validateFacet = function(resolver, facet, wire) {
      var name, strategies, strategy, strategyName, target, value, _ref;
      target = facet.target;
      _ref = facet.options;
      for (name in _ref) {
        strategies = _ref[name];
        value = target.elements[name].value;
        for (strategyName in strategies) {
          strategy = strategies[strategyName];
          if (_.isFunction(strategy.rule)) {
            console.log("strategy.rule called:::", strategy.rule(1));
          } else if (_.isRegExp(strategy.rule)) {
            console.log("Regexp::::", strategy.rule);
          }
        }
      }
      return resolver.resolve();
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
