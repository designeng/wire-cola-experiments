define [
    "jquery"
    "underscore"
    "eventEmitter"
], ($, _, EventEmitter) ->

    class Controller

        emitter: new EventEmitter()

        # on: (handler) ->

        # off: (handler) ->

        addSourceToOriginal: (array) ->
            @originalCollection.addSource array

        onBunchData: (data) ->
            console.debug "onBunchData", data

        onReady: ->

            console.debug "emitter:::", @emitter

            setTimeout () =>
                @twoTrigger()
            , 300

            setTimeout () =>
                @oneTrigger()
            , 600

        onCollectionFiltered: ->


        oneTrigger: ->
            console.debug "oneTrigger invoked"
            return {
                name: "oneTrigger"
                value: 123
            }

        twoTrigger: ->
            console.debug "twoTrigger invoked"
            return {
                name: "twoTrigger"
                value: 123
            }


