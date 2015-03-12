define(['signals'], function(Signal) {
  var SignalEmitter, _proto;
  SignalEmitter = (function() {
    function SignalEmitter() {
      this._signals = {};
    }

    SignalEmitter.prototype.addListener = function(event, handler, scope, priority) {
      if (!this._signals[event]) {
        this._signals[event] = new Signal();
      }
      return this._signals[event].add(handler, scope, priority);
    };

    SignalEmitter.prototype.removeListener = function(event, handler) {
      var sig;
      sig = this._signals[event];
      if (!sig) {
        return;
      }
      return sig.remove(handler);
    };

    SignalEmitter.prototype.getSignal = function(event) {
      return this._signals[event];
    };

    SignalEmitter.prototype.dispatch = function(event, args) {
      var sig;
      sig = this._signals[event];
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
  _proto = SignalEmitter.prototype;
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
