define [
    "jquery"
    "underscore"
], ($, _) ->

    class Controller

        addSourceToOriginal: (array) ->
            @originalCollection.addSource array

        onReady: ->
            setTimeout () =>
                console.debug "documentTypesCollection", @documentTypesCollection.getSource()
            , 1000

        onCollectionFiltered: ->


