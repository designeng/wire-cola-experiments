define [
    "moment"
    "jquery"
], (moment, $) ->

    class CalendarController

        onReady: ->
            console.log "___@collection", @collection

        aNodeHandlerFunction: (node, data, info, doDefault) ->
            console.log "___aNodeHandlerFunction", node, data, info

            $(node).text(data.day)

            if data.day%7 == 0
                $(node).addClass "weekend"
            


