define [
    "underscore"
    "when"
    "wire"
    "components/form/validator/spec"
], (_, When, wire, defaultValidator) ->

    return (options) ->

        validateFacet = (resolver, facet, wire) ->
            wire(facet.options)
                .then (options) ->

                    target = facet.target

                    if !options.validator

                        essential = ["strategy", "successHandler", "displaySlot"]
                        for opt in essential
                            if !options[opt]
                                throw new Error "#{opt} should be provided!"

                        wire({
                            formView: target
                            validator:
                                wire:
                                    spec: defaultValidator
                                    provide:
                                        form: target
                                        fieldNames: _.keys options.strategy
                                        strategy: options.strategy
                                        successHandler: options.successHandler
                                        slot: options.displaySlot
                        }).then (context) ->
                            resolver.resolve()
                    else
                        resolver.resolve()

        pluginObject =
            facets: 
                validate:
                    ready: validateFacet

        return pluginObject