define [
    "underscore"
    "jquery"
    "kefir"
    "kefirJquery"
], (_, $) ->

    class Controller

        constructor: ->
            @element = $("#page")

            transformer = () ->
                return $(@).find(".rect").css "width"

            stream = @element.asKefirStream("change", transformer)
                .onValue (value) -> 
                    console.log "VALUE:::", value

            stream.log()

            @element.trigger "change"

