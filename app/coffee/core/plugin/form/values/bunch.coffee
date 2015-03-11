# valuesBunch plugin
define [
    "lodash"
    "jquery"
    "kefir"
    "kefirJquery"
], (_, $, Kefir, KefirJquery) ->

    KefirJquery.init Kefir, $

    return (options) ->

        valuesBunchFacetReady = (resolver, facet, wire) ->
            inputs = []
            fieldNamesStreams = []
            target = facet.target
            wire(facet.options).then (options) ->

                deliverTo = options.deliverTo

                if _.isPlainObject deliverTo
                    deliverToCallback = (res) ->
                        deliverTo = _.extend deliverTo, res
                else if _.isFunction deliverTo
                    deliverToCallback = deliverTo
                else
                    throw new Error "Option 'deliverTo' should be function or plain js object!"

                form = $(target)

                _.each options.byFields, (name) ->
                    inputs[name] = form.find("[name='" + name + "']")

                    getFieldData = do (name) ->
                        () ->
                            obj = 
                                name: name
                                value: inputs[name].val()
                            return obj

                    fieldNamesStreams[name] = inputs[name]
                        .asKefirStream("change", getFieldData)

                # combine streams from all inputs whose names in byFields
                Kefir.combine(_.values fieldNamesStreams).onValue deliverToCallback

                resolver.resolve()

        pluginInstance = 
            facets:
                valuesBunch:
                    "ready"         : valuesBunchFacetReady

        return pluginInstance