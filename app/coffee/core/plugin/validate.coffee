define [
    "underscore"
    "jquery"
    "./utils/validatePluginUtils"
], (_, $, ValidatePluginUtils) ->

    $target = null

    noop = () ->

    doValidate = (obj, validationFunc, structure) ->
        console.log "structure:::", structure
        validationFunc(structure, obj)

    return (options) ->

        # validation should be on:
        # "submit"
        # "change" (mark it as valid after change)
        # "keyup" - if field was validated and not valid

        validateFacet = (resolver, facet, wire) ->
            wire(facet.options)
                .then (options) ->
                    console.log "options", options

                    target = facet.target

                    pluginUtils = new ValidatePluginUtils(target)
                    
                    $target = pluginUtils.registerTarget(target)

                    pluginUtils.getAllInputs()

                    
                    extracted = pluginUtils.extractStrategies(options)
                    extracted = pluginUtils.normalizeStrategyItemsArray extracted
                    extracted = pluginUtils.getRulesArray extracted

                    # pluginUtils.validate(extracted)

                    errors = []


                    validate = () ->

                        obj = pluginUtils.getAllFormValues(target)

                        console.log "FORM -> OBJ:::", obj

                        promise = pluginUtils.validate(extracted)
                        # promise.then (res) ->
                        #     console.log "PROMISE RES:::", res
                        # , (err) ->
                        #     console.error "PROMISE ERROR", err


                        # doValidate(obj, pluginUtils.validate, extracted)

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

                pluginUtils.unregisterTarget()
                resolver.resolve()

        facets: 
            validate:
                ready: validateFacet