require(["underscore", "wire", "hasher", "wire!bootstrapSpec", "routerMainSpec", "signals"], function(_, wire, hasher, bootstrapCTX, routerMainSpec, Signal) {
  return bootstrapCTX.wire(routerMainSpec).then(function(resultCTX) {
    hasher.prependHash = "";
    hasher.init();
    return Signal.prototype = _.extend(Signal.prototype, {
      on: Signal.prototype.add,
      off: Signal.prototype.remove
    });
  });
});
