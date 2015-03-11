define [
    "jquery"
    "underscore"
], ($, _) ->

    class Controller

        addSourceToOriginal: (array) ->
            @originalCollection.addSource array

        onBunchData: (data) ->
            console.debug "onBunchData", data

        onReady: ->
            setTimeout () =>
                console.debug "documentTypesCollection", @documentTypesCollection.getSource()
            , 1000

        onCollectionFiltered: ->


