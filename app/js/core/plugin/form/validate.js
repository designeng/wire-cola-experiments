define(["underscore", "when", "wire", "components/form/validator/spec"], function(_, When, wire, defaultValidator) {
  return function(options) {
    var pluginObject, validateFacet;
    validateFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var essential, opt, target, _i, _len;
        target = facet.target;
        if (!options.validator) {
          essential = ["strategy", "successHandler", "displaySlot"];
          for (_i = 0, _len = essential.length; _i < _len; _i++) {
            opt = essential[_i];
            if (!options[opt]) {
              throw new Error("" + opt + " should be provided!");
            }
          }
          return wire({
            formView: target,
            validator: {
              wire: {
                spec: defaultValidator,
                provide: {
                  form: target,
                  fieldNames: _.keys(options.strategy),
                  strategy: options.strategy,
                  successHandler: options.successHandler,
                  slot: options.displaySlot
                }
              }
            }
          }).then(function(context) {
            return resolver.resolve();
          });
        } else {
          return resolver.resolve();
        }
      });
    };
    pluginObject = {
      facets: {
        validate: {
          ready: validateFacet
        }
      }
    };
    return pluginObject;
  };
});
