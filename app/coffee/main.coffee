# it works with contextRouter

require [
    "underscore"
    "wire"
    "hasher"
    "wire!bootstrapSpec"
    "routerMainSpec"
    "signals"
], (_, wire, hasher, bootstrapCTX, routerMainSpec, Signal) ->

    bootstrapCTX.wire(
        routerMainSpec
    ).then (resultCTX) ->

        hasher.prependHash = ""
        hasher.init()

        Signal:: = _.extend Signal::, {
            on:     Signal::add
            off:    Signal::remove
        }