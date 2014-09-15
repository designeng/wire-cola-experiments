define [
    "underscore"
    "handlebars"
    "when"
], (_, Handlebars, When) ->

    sum = (memo, text) ->
        return memo + text

    processCollection = (rootElement, itemPattern, list, zeroPattern) ->

        result = []

        if !list.length and zeroPattern?
            result.push zeroPattern
        else
            for item in list
                result.push _.template itemPattern, item

        result.unshift "<#{rootElement}>"
        result.push "</#{rootElement}>"

        resultHtml = _.reduce result, sum, ""

        return resultHtml

    acceptTransformations = (list, itemTransformations) ->
        if _.isEmpty itemTransformations
            return list

        console.log "itemTransformations::::", itemTransformations

        fields = _.keys itemTransformations
        transformations = _.values itemTransformations

        for item in list
            fieldCount = 0
            for fieldName in fields
                item[fieldName] = transformations[fieldCount].call item, fieldName

        return list


    return (options) ->

        factories:
            templateSource: (resolver, componentDef, wire) ->
                wire(componentDef.options)
                    .then (options) ->
                        pattern = options.pattern
                        fillWith = options.fillWith
                        itemPattern = options.itemPattern
                        rootElement = options.rootElement
                        zeroPattern = options.zeroPattern
                        itemTransformations = options.itemTransformations
                        
                        if fillWith?
                            if fillWith instanceof Array
                                if !rootElement?
                                    rootElement = "ul"
                                if !itemPattern?
                                    throw new Error "itemPattern option should be defined!"

                                if itemTransformations?
                                    fillWith = acceptTransformations(fillWith, itemTransformations)

                                return processCollection(rootElement, itemPattern, fillWith, zeroPattern)
                                
                            # TODO: should be test for object (model)?
                            else
                                if !pattern?
                                    throw new Error "pattern option should be defined!"
                                return pattern(fillWith)
                        else
                            return pattern
                    .then(resolver.resolve, resolver.reject)