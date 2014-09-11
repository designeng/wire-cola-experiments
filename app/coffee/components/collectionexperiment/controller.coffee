define [
    "jquery"
    "underscore"
], ($, _) ->

    class Controller

        onReady: ->
            _.bindAll @, "locationHandler"

        isElement: (obj) ->
            try
                return obj instanceof HTMLElement
            catch e
                return (typeof obj == "object") and (obj.nodeType == 1 ) and (typeof obj.style == "object") and (typeof obj.ownerDocument == "object")
            
        locationHandler: (node, data, info) ->
            # console.log "DATA:::::", node, data, info

            $(node).text data.location

