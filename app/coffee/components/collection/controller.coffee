define [
    "jquery"
    "underscore"
], ($, _, EventEmitter) ->

    class Controller

        addSourceToOriginal: (array) ->
            @originalCollection.addSource array

        onBunchData: (data) ->
            console.debug "onBunchData", data

        onReady: ->

            setTimeout () =>
                @twoTrigger()
            , 300

            setTimeout () =>
                @threeTrigger()
            , 450

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
                value: 1234567
            }

        threeTrigger: ->
            console.debug "threeTrigger invoked"
            return {
                name: "threeTrigger"
                value: "threeTrigger-----123"
            }



