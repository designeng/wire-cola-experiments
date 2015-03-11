define(["lodash", "jquery", "kefir", "kefirJquery"], function(_, $, Kefir, KefirJquery) {
  KefirJquery.init(Kefir, $);
  return function(options) {
    var pluginInstance, valuesBunchFacetReady;
    valuesBunchFacetReady = function(resolver, facet, wire) {
      var fieldNamesStreams, inputs, target;
      inputs = [];
      fieldNamesStreams = [];
      target = facet.target;
      return wire(facet.options).then(function(options) {
        var deliverTo, deliverToCallback, form;
        deliverTo = options.deliverTo;
        if (_.isPlainObject(deliverTo)) {
          deliverToCallback = function(res) {
            return deliverTo = _.extend(deliverTo, res);
          };
        } else if (_.isFunction(deliverTo)) {
          deliverToCallback = deliverTo;
        } else {
          throw new Error("Option 'deliverTo' should be function or plain js object!");
        }
        form = $(target);
        _.each(options.byFields, function(name) {
          var getFieldData;
          inputs[name] = form.find("[name='" + name + "']");
          getFieldData = (function(name) {
            return function() {
              var obj;
              console.debug("getFieldData", name, inputs[name].val());
              obj = {
                name: name,
                value: inputs[name].val()
              };
              return obj;
            };
          })(name);
          return fieldNamesStreams[name] = inputs[name].asKefirStream("change", getFieldData);
        });
        Kefir.combine(_.values(fieldNamesStreams)).onValue(deliverToCallback);
        return resolver.resolve();
      });
    };
    pluginInstance = {
      facets: {
        valuesBunch: {
          "ready": valuesBunchFacetReady
        }
      }
    };
    return pluginInstance;
  };
});
