# from here http://blog.millermedeiros.com/signal-emitter/
define [
    'signals'
], (Signal) ->

    # TODO: does not pass event data!
 
    class SignalEmitter

        constructor: ->
            @._signals = {}
 
        addListener: (event, handler, scope, priority) ->
            if !@._signals[event]
                @._signals[event] = new Signal()
            return @._signals[event].add(handler, scope, priority)
 
        removeListener: (event, handler) ->
            sig = @._signals[event]
            return if !sig 
            sig.remove(handler)
 
        getSignal: (event) ->
            return @._signals[event]
 
        dispatch: (event, args) ->
            sig = @._signals[event]
            return if !sig
            if args
                sig.dispatch.apply(sig, args)
            else
                sig.dispatch()

    _proto = SignalEmitter::
 
    SignalEmitter.augment = (target) ->
        SignalEmitter.call(target)
        for key in _proto
            if _proto.hasOwnProperty(key)
                target[key] = _proto[key]
 
    return SignalEmitter
