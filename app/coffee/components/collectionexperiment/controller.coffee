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

        clicked: (e) ->
            data = $(e.target)
                .closest('li')
                .attr('data-underscore-id')
                
            console.log "CLICKED:", data
            
        locationHandler: (node, data, info) ->
            # console.log "DATA:::::", node, data, info

            $(node).text data.location

            # here subview, previously fabricated, can be attahed to wrapper.
            # if it showld be visibly anyway, all subview templates can be underscored at the rendering:before step

        eachHandler: (node, data, info) ->
            console.log node
            # node.textContent("----")
            # $(node).text "----"

        allHandler: (node, data, info) ->
            # $(node).text "123"

        liClicked: (e) ->
            console.log "CLICKED:::::", e

        onClickLi: (e) ->
            console.log "CLICKED ITEM:::::", e

