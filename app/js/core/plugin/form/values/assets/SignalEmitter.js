define(['signals'], function(Signal) {
  var SignalEmitter;
  SignalEmitter = (function() {
    function SignalEmitter() {
      this._signals = {};
    }

    SignalEmitter.prototype.addListener = function(id, handler, scope, priority) {
      console.debug(id, handler, scope, priority);
      if (this._signals[id]) {
        this._signals[id] = new Signal();
      }
      return this._signals[id].add(handler, scope, priority);
    };

    SignalEmitter.prototype.removeListener = function(id, handler) {
      var sig;
      sig = this._signals[id];
      if (!sig) {
        return;
      }
      return sig.remove(handler);
    };

    SignalEmitter.prototype.getSignal = function(id) {
      return this._signals[id];
    };

    SignalEmitter.prototype.emit = function(id, args) {
      var sig;
      sig = this._signals[id];
      if (!sig) {
        return;
      }
      if (args) {
        return sig.dispatch.apply(sig, args);
      } else {
        return sig.dispatch();
      }
    };

    return SignalEmitter;

  })();
  SignalEmitter.augment = function(target) {
    var key, _i, _len, _results;
    SignalEmitter.call(target);
    _results = [];
    for (_i = 0, _len = _proto.length; _i < _len; _i++) {
      key = _proto[_i];
      if (_proto.hasOwnProperty(key)) {
        _results.push(target[key] = _proto[key]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };
  return SignalEmitter;
});
