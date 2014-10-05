define [
    "jquery"
    "underscore"
], ($, _) ->

    class CustomNodeItemAdapter

        constructor: (rootNode, options) ->
            console.log "CustomNodeItemAdapter", rootNode, options
            @_rootNode = rootNode
            @_options = options

        getOptions: () ->
            return @._options

        set: (item) ->
            console.log "SET:::", item, @rootNode
            $(@_rootNode).text "::::"+ item.port

        update: (item) ->

        destroy: () ->

        properties: (lambda) ->
            lambda(@._item)


    CustomNodeItemAdapter.canHandle = (obj) ->
        return obj and obj.tagName and obj.getAttribute and obj.setAttribute

    return CustomNodeItemAdapter