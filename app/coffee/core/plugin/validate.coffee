define [
    "underscore"
    "jquery"
    "when"
    "./utils/colaway/form"
], (_, $, When, FormUtil) ->

    $target = null

    inputs = []

    inputsPromises = []

    unbindAll = () ->
        for input in inputs
            input.unbind()
        $target.unbind()

    noop = () ->

    pointsToArray = (points) ->
        return _.values points

    createStrategy = (array) ->
        result = []
        for item in array

            rulePromise = (isValid) ->
                console.log "isValid:::", isValid
                promise = When.promise (resolve, reject) ->
                    if isValid
                        resolve()
                    else
                        reject()
                return promise
                                
            ruleWithMessage = _.compose(rulePromise, item.rule)
            result.push ruleWithMessage

        validationPromise = When.all(result)
        return validationPromise

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
                    $target = $(target)
                    
                    for fieldName, fieldPoints of options.fields
                        # get input 
                        input = $target.find("input[name='" + fieldName + "']")
                        # register it - it will be used on destroy phase
                        inputs.push input

                        inputValidationStrategyPromise = createStrategy(pointsToArray(fieldPoints))

                        inputsPromises.push {
                            name: fieldName
                            promise: inputValidationStrategyPromise
                        }


                        # and bind to "change" event, but fieldName must be injected
                        input.bind "change", do (fieldName) ->
                            (e) ->
                                console.log e.target.value
                                promise = _.where(inputsPromises, {name: fieldName})

                                console.log "PROMISE:::", promise
                                all = When.all(promise).then (res) ->
                                    console.log "SUCCESS", res


                    validate = () ->

                        obj = FormUtil.getValues(target)
                        console.log "OBJ:::", obj


                        # doValidate(obj, pluginUtils.validate, extracted)

                        # if options.afterValidation?
                        #     options.afterValidation(target, errors)
                        return false

                    $target.bind "submit", validate


                    resolver.resolve()


        # return plugin object
        context:
            destroy: (resolver, wire) ->
                console.log "destroyed>>>>"

                unbindAll()
                resolver.resolve()

        facets: 
            validate:
                ready: validateFacet