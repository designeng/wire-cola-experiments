# from here http://blog.millermedeiros.com/signal-emitter/
define [
    'signals'
], (Signal) ->
 
    class SignalEmitter

        constructor: ->
            @._signals = {}
 
        addListener: (id, handler, scope, priority) ->
            console.debug id, handler, scope, priority
            if @._signals[id]
                @._signals[id] = new Signal()
            return @._signals[id].add(handler, scope, priority)
 
        removeListener: (id, handler) ->
            sig = @._signals[id]
            return if !sig 
            sig.remove(handler)
 
        getSignal: (id) ->
            return @._signals[id]
 
        emit: (id, args) ->
            sig = @._signals[id]
            return if !sig
            if args
                sig.dispatch.apply(sig, args)
            else
                sig.dispatch()
 
    SignalEmitter.augment = (target) ->
        SignalEmitter.call(target)
        for key in _proto
            if _proto.hasOwnProperty(key)
                target[key] = _proto[key]
 
    return SignalEmitter
