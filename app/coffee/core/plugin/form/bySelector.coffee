define [
    "jquery"
], ($) ->

    # helper plugin (for jasmine tests)

    return (options) ->

        bySelectorFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (formElement) ->
                resolver.resolve(formElement)

        pluginInstance = 

            factories: 
                bySelector      : bySelectorFactory

        return pluginInstance