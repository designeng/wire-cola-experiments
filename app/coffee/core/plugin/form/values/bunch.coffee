# valuesBunch plugin
define [
    "lodash"
    "jquery"
    "meld"
    "wire/lib/object"
    "kefir"
    "kefirJquery"
], (_, $, meld, object, Kefir, KefirJquery) ->

    KefirJquery.init Kefir, $

    return (options) ->

        removers = []

        isRef = (it) ->
            return it and object.hasOwn(it, '$ref')

        getClassAndMethod = (str) ->
            # one dot access restriction
            return str.split(".").slice(0, 2)

        byInvocationCreate = (referenceObj, streams, wire) ->
            if !isRef(referenceObj)
                throw new Error "Should be described as wire reference!"

            # {Array of Strings}
            [providerClass, invoker] = getClassAndMethod(referenceObj["$ref"])

            spec = 
                provider: {$ref: providerClass}
                method: referenceObj

            wire(spec).then (specObject) ->
                streams.push Kefir.fromEvent(specObject.provider.emitter, "change")

                removers.push meld.after specObject.provider, invoker, (result) ->
                    console.debug "RES:", result
                    specObject.provider.emitter.emit "change", result

        valuesBunchFacetReady = (resolver, facet, wire) ->
            inputs = []
            streams = []
            target = facet.target

            _.each facet.options.byInvocations, (invocationReferenceObj) ->
                console.debug "invocationReferenceObj", invocationReferenceObj
                byInvocationCreate invocationReferenceObj, streams, wire

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
                            console.debug "getFieldData", name, inputs[name].val()
                            obj = 
                                name: name
                                value: inputs[name].val()
                            return obj

                    streams[name] = inputs[name]
                        .asKefirStream("change", getFieldData)

                console.debug "streams::::", streams

                # combine streams from all inputs whose names in byFields
                Kefir.combine(_.values streams).onValue deliverToCallback

                resolver.resolve()

        pluginInstance = 
            facets:
                valuesBunch:
                    "ready"         : valuesBunchFacetReady

        return pluginInstance