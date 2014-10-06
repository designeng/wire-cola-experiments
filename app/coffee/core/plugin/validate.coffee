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

    registerInput = (targetName, inputName, input) ->
        # ensure it exists
        if !targetRegistrator[targetName]["inputs"]
            targetRegistrator[targetName]["inputs"] = {}
        if !targetRegistrator[targetName]["inputs"][inputName]
            targetRegistrator[targetName]["inputs"][inputName] = {}

        targetRegistrator[targetName]["inputs"][inputName]["input"] = input

    registerInputHandler = (targetName, inputName, event, handler) ->
        targetRegistrator[targetName]["inputs"][inputName]["input"].bind event, handler

    normalizePoints = (points) ->
        points = _.map points, (item) ->
            item.rule = normalizeRule(item.rule)
            return item
        return points

    # we want deal with the function
    normalizeRule = (rule) ->
        if _.isFunction rule
            return rule
        else if _.isRegExp rule
            return (value) ->
                return value.match rule

    registerInputStrategy = (targetName, inputStrategy) ->
        # ensure it exists
        if !targetRegistrator[targetName]["strategies"]
            targetRegistrator[targetName]["strategies"] = []

        inputStrategy.points = normalizePoints(inputStrategy.points)

        targetRegistrator[targetName]["strategies"].push inputStrategy

    getInputStrategy = (targetName, fieldName) ->
        return _.where(targetRegistrator[targetName]["strategies"], {name: fieldName})[0]

    registerInputValidationResult = (targetName, inputName, result) ->
        if result.errors
            res = 0
        else
            res = 1
        targetRegistrator[targetName]["inputs"][inputName]["validationResult"] = res

    unbindAll = () ->
        for targetName, targetObject of targetRegistrator
            # unbind elements
            for inputName, input of targetObject["inputs"]
                input.unbind()
            # unbind form
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
                        registerInput(targetName, fieldName, input)
                        # register strategy for input
                        registerInputStrategy(targetName, {name: fieldName, points: fieldPoints})

                        # and bind to "change" event, but fieldName must be injected
                        validateInputValue = do (fieldName, targetName) -> 
                            (e) ->
                                console.log e.target.value
                                strategy = getInputStrategy(targetName, fieldName)

                                # Array
                                strategyPoints = _.values(strategy.points)
                                console.log "strategyPoints:::", strategyPoints

                                iterator = do (value = e.target.value) ->
                                    (result, item) ->
                                        if result.errors
                                            return result
                                        else
                                            if !item.rule(value)
                                                result["errors"] = []
                                                result["errors"].push item.message
                                            return result

                                result = _.reduce(strategyPoints, iterator, {})
                                registerInputValidationResult(targetName, fieldName, result)

                                console.log "processing res:::::", result

                        registerInputHandler(targetName, fieldName, "change", validateInputValue)

                    validateForm = do (targetName) ->
                        () ->
                            obj = FormUtil.getValues(target)
                            console.log "OBJ:::", obj, targetName

                            if options.pluginInvoker
                                options.pluginInvoker(pluginObject, target, refresh)
                           
                            return false

                    registerTargetHandler(targetName, "submit", validateForm)

                    # experiment with refrefing options from controller
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