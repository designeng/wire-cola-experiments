define [
    "underscore"
    "jquery"
], (_, $) ->

    return (options) ->

        validateFacet = (resolver, facet, wire) ->
            target = facet.target

            # form can have more then one element
            for name, strategies of facet.options.fields
                # get the element value
                value = target.elements[name].value
                # can be more then one strategy
                for strategyName, strategy of strategies
                    # check for function type
                    if _.isFunction strategy.rule
                        console.log "strategy.rule called:::", strategy.rule(1)
                    else if _.isRegExp strategy.rule
                        console.log "Regexp::::", strategy.rule

            resolver.resolve()

        context:
            destroy: (resolver, wire) ->
                resolver.resolve()

        facets: 
            validate:
                ready: validateFacet