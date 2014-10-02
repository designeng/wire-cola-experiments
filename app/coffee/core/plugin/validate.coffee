define [
    "underscore"
    "jquery"
    "./utils/validatePluginUtils"
], (_, $, ValidatePluginUtils) ->

    $target = null

    noop = () ->

    pluginUtils = new ValidatePluginUtils()

    return (options) ->

        validateFacet = (resolver, facet, wire) ->
            wire(facet.options)
                .then (options) ->
                    console.log "options", options

                    target = facet.target
                    $target = $(target)

                    extracted = pluginUtils.extractStrategies(options)
                    extracted = pluginUtils.normalizeStrategyItemsArray extracted
                    extracted = pluginUtils.getRulesArray extracted

                    pluginUtils.validate(extracted)

                    errors = []

                    validate = () ->
                        if options.afterValidation?
                            options.afterValidation(target, errors)
                        return false

                    $target.bind "submit", validate

                    


                    # console.log "extracted", extracted
                    


                    resolver.resolve()


        # return plugin object
        context:
            destroy: (resolver, wire) ->
                console.log "destroyed>>>>"
                $target.unbind()
                resolver.resolve()

        facets: 
            validate:
                ready: validateFacet