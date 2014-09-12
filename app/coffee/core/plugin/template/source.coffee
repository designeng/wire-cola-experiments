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

    processCollection = (pattern, list) ->
        pattern = trim pattern
        pattern = removeTabs pattern
        console.log "PATTERN:::", pattern

        matched = pattern.match(tagRegexp)

        if matched[1] == "ul"
            # find li inside
            matched_li = matched[3].match(tagRegexp)
            if matched_li[1] == "li"
                itemPattern = matched_li[0]
                console.log "ITEM PATTERN::::", itemPattern

        result = ""

        return result

    return (options) ->

        factories:
            templateSource: (resolver, componentDef, wire) ->
                wire(componentDef.options)
                    .then (options) ->
                        pattern = options.pattern
                        fillWith = options.fillWith

                        if !pattern?
                            throw new Error "Pattern option should be defined!"
                        
                        if fillWith?
                            if fillWith instanceof Array 
                                return processCollection(pattern, fillWith)
                                # return "<div>TEST</div>"
                            # TODO: should be test for object? 
                            else
                                return _.template pattern, fillWith
                        else
                            return pattern
                    .then(resolver.resolve, resolver.reject)