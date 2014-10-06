define [
    "underscore"
    "jquery"
    "./utils/colaway/bindingHandler"
    "./utils/colaway/form"
], (_, $, bindingHandler, FormUtil) ->

    $target = null

    noop = () ->

    pointsToArray = (points) ->
        return _.values points

    doValidate = (obj, validationFunc, structure) ->
        validationFunc(structure, obj)

    return (options) ->

        # validation should be on:
        # "submit"
        # "change" (mark it as valid after change)
        # "keyup" - if field was validated and not valid

        validateFacet = (resolver, facet, wire) ->
            wire(facet.options)
                .then (options) ->

                    target = facet.target

                    _bindingHandler = bindingHandler(target, options)
                    
                    for fieldName, fieldPoints of options.fields

                        input = target.elements[fieldName]
                        console.log input




                    errors = []


                    validate = () ->

                        obj = FormUtil.getValues(target)
                        console.log "OBJ:::", obj


                        # doValidate(obj, pluginUtils.validate, extracted)

                        # if options.afterValidation?
                        #     options.afterValidation(target, errors)
                        return false

                    $(target).bind "submit", validate


                    resolver.resolve()


        # return plugin object
        context:
            destroy: (resolver, wire) ->
                console.log "destroyed>>>>"


                resolver.resolve()

        facets: 
            validate:
                ready: validateFacet