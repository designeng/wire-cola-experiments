define [
    "underscore"
    "jquery"
    "./utils/validatePluginUtils"
], (_, $, ValidatePluginUtils) ->

    noop = () ->

    pluginUtils = new ValidatePluginUtils()

    return (options) ->

        validateFacet = (resolver, facet, wire) ->
            wire(facet.options)
                .then (options) ->
                    console.log "options", options

                    target = facet.target

                    strategies = pluginUtils.extractStrategies(options)
                    
                    pluginUtils.pipelineStrategies(strategies)


                    resolver.resolve()


        # return plugin object
        context:
            destroy: (resolver, wire) ->
                resolver.resolve()

        facets: 
            validate:
                ready: validateFacet