define [
    "underscore"
    "when"
], (_, When) ->

    tagRegexp = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/

    tabulationRegexp = /\t\n/g

    trim = (str) -> 
        str.replace(/^\s+|\s+$/g,'')

    removeTabs = (str) ->
        str.replace(tabulationRegexp,'')

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
                        
                        if fillWith?
                            if fillWith instanceof Array
                                if !rootElement?
                                    rootElement = "ul"
                                if !itemPattern?
                                    throw new Error "itemPattern option should be defined!"
                                return processCollection(rootElement, itemPattern, fillWith, zeroPattern)
                            # TODO: should be test for object (model)?
                            else
                                if !pattern?
                                    throw new Error "pattern option should be defined!"
                                return _.template pattern, fillWith
                        else
                            return pattern
                    .then(resolver.resolve, resolver.reject)