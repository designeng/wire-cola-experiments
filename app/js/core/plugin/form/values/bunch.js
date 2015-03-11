define(["lodash", "jquery", "meld", "wire/lib/object", "kefir", "kefirJquery"], function(_, $, meld, object, Kefir, KefirJquery) {
  KefirJquery.init(Kefir, $);
  return function(options) {
    var byInvocationCreate, getClassAndMethod, isRef, pluginInstance, removers, valuesBunchFacetReady;
    removers = [];
    isRef = function(it) {
      return it && object.hasOwn(it, '$ref');
    };
    getClassAndMethod = function(str) {
      return str.split(".").slice(0, 2);
    };
    byInvocationCreate = function(referenceObj, streams, wire) {
      var invoker, providerClass, spec, _ref;
      if (!isRef(referenceObj)) {
        throw new Error("Should be described as wire reference!");
      }
      _ref = getClassAndMethod(referenceObj["$ref"]), providerClass = _ref[0], invoker = _ref[1];
      spec = {
        provider: {
          $ref: providerClass
        },
        method: referenceObj
      };
      return wire(spec).then(function(specObject) {
        streams.push(Kefir.fromEvent(specObject.provider.emitter, "change"));
        return removers.push(meld.after(specObject.provider, invoker, function(result) {
          console.debug("RES:", result);
          return specObject.provider.emitter.emit("change", result);
        }));
      });
    };
    valuesBunchFacetReady = function(resolver, facet, wire) {
      var inputs, streams, target;
      inputs = [];
      streams = [];
      target = facet.target;
      _.each(facet.options.byInvocations, function(invocationReferenceObj) {
        console.debug("invocationReferenceObj", invocationReferenceObj);
        return byInvocationCreate(invocationReferenceObj, streams, wire);
      });
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
          return streams[name] = inputs[name].asKefirStream("change", getFieldData);
        });
        console.debug("streams::::", streams);
        Kefir.combine(_.values(streams)).onValue(deliverToCallback);
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
