define [
    "jquery"
    "underscore"
], ($, _) ->

    CustomNodeItemAdapter = (rootNode, options) ->
        console.log "CustomNodeItemAdapter", rootNode, options
        @rootNode = rootNode
        @._options = options

    CustomNodeItemAdapter:: = {
        getOptions: () ->
            return @._options

        set: (item) ->
            console.log "SET:::", item
            @rootNode.innerHTML = item.port

        update: (item) ->

        properties: (lambda) ->
            lambda(@._item)
    }

    CustomNodeItemAdapter.canHandle = (obj) ->
        return obj and obj.tagName and obj.getAttribute and obj.setAttribute

    return CustomNodeItemAdapter