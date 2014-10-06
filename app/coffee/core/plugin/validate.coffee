define [
    "underscore"
    "jquery"
    "when"
    "./utils/colaway/form"
], (_, $, When, FormUtil) ->

    pluginObject = null

    targetRegistrator = {}

    registerTarget = (target) ->
        $target = $(target)
        targetName = $target.attr("name")

        if !targetName
            throw new Error "Attribute 'name' must be defined for the form!"

        if !targetRegistrator[targetName]
            targetRegistrator[targetName] = {}
            targetRegistrator[targetName]["$target"] = $target

        return {
            $target: $target
            targetName: targetName
        }

    registerTargetHandler = (targetName, event, handler) ->
        targetRegistrator[targetName]["$target"].bind "submit", handler

    registerInput = (targetName, input) ->
        # ensure it exists
        if !targetRegistrator[targetName]["inputs"]
            targetRegistrator[targetName]["inputs"] = []

        targetRegistrator[targetName]["inputs"].push input

    registerInputStrategy = (targetName, inputStrategy) ->
        # ensure it exists
        if !targetRegistrator[targetName]["strategies"]
            targetRegistrator[targetName]["strategies"] = []

        targetRegistrator[targetName]["strategies"].push inputStrategy

    getInputStrategy = (targetName, fieldName) ->
        return _.where(targetRegistrator[targetName]["strategies"], {name: fieldName})[0]

    unbindAll = () ->
        for targetName, targetObject in targetRegistrator
            # unbind elements
            inputs = targetObject["inputs"]
            for input in inputs
                input.unbind()
            # unbind form itself
            targetObject["$target"].unbind()

    noop = () ->

    pointsToArray = (points) ->
        return _.values points

    refresh = (val) ->
        console.log "refresh", val, targetRegistrator

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

    return (options) ->

        # validation should be on:
        # "submit"
        # "change" (mark it as valid after change)
        # "keyup" - if field was validated and not valid

        validateFacet = (resolver, facet, wire) ->
            wireFacetOptions(resolver, facet, wire)

        wireFacetOptions = (resolver, facet, wire) ->
            wire(facet.options)
                .then (options) ->

                    target = facet.target

                    registred = registerTarget(target)
                    targetName = registred.targetName
                    
                    for fieldName, fieldPoints of options.fields
                        # get input 
                        input = registred["$target"].find("input[name='" + fieldName + "']")
                        # register it - it will be used on destroy phase
                        registerInput(targetName, input)
                        # register strategy for input
                        registerInputStrategy(targetName, {name: fieldName, points: fieldPoints})

                        predicate = (item, index) ->
                            console.log "predicate::::", item, index

                        # and bind to "change" event, but fieldName must be injected
                        input.bind "change", do (fieldName, targetName) -> 
                            (e) ->
                                console.log e.target.value
                                strategy = getInputStrategy(targetName, fieldName)

                                # Array
                                strategyPoints = _.values(strategy.points)
                                console.log "strategyPoints:::", strategyPoints

                                promise = When.filter(strategyPoints, predicate).then (res) ->
                                    console.log "SUCCESS", res

                    validate = do (targetName) ->
                        () ->
                            obj = FormUtil.getValues(target)
                            console.log "OBJ:::", obj, targetName

                            if options.pluginInvoker
                                options.pluginInvoker(pluginObject, target, refresh)

                            # if options.afterValidation?
                            #     options.afterValidation(target, errors)
                            return false

                    registerTargetHandler(targetName, "submit", validate)

                    if options.pluginInvoker
                        options.pluginInvoker(pluginObject, target, refresh)

                    resolver.resolve()


        # return plugin object
        pluginObject = 
            context:
                destroy: (resolver, wire) ->
                    unbindAll()
                    resolver.resolve()

            facets: 
                validate:
                    ready: validateFacet

        return pluginObject