define [
    "underscore"
    "jquery"
    "when/pipeline"
    "kefir"
    "kefirJquery"
], (_, $, pipeline) ->

    normalize = (target) ->
        return $(target)

    return (options) ->

        streamsFacet = (resolver, facet, wire) ->
            wire(facet.options)
                .then (options) ->

                    controller = facet.target

                    form = controller.form = normalize(controller.form)

                    _.each controller.fieldNames, (name) ->
                        @.inputs[name] = form.find("input[name='" + name + "']")
                    , controller

                    events = _.keys options
                    handlers = _.values options

                    submitEvent = "submit"
                        
                    _.map events, (event) ->

                        methods = _.map options[event].split("|"), (method) ->
                            return $.trim method

                        filters = _.filter methods, (method) ->
                            if method.match /filter:/g then true else false

                        beforeAll = _.filter methods, (method) ->
                            if method.match /before:/g then true else false

                        # tasks = methods - filters
                        tasks = _.difference(methods, _.union(filters, beforeAll))

                        # bind every method to controller
                        filters = _.map filters, (item) -> 
                            filter = item.split(":")[1]
                            _.bindAll @, filter
                            return @[filter]
                        , @

                        beforeAll = _.map beforeAll, (item) -> 
                            method = item.split(":")[1]
                            _.bindAll @, method
                            return @[method]
                        , @

                        tasks = _.map tasks, (task) ->
                            _.bindAll @, task
                            return @[task]
                        , @

                        if event != submitEvent
                            _.each @.fieldNames, (name) ->

                                getFieldData = do (target = @, name) ->
                                    () ->
                                        obj = 
                                            event: event
                                            name: name
                                            value: target.inputs[name].val()
                                        return obj

                                # should not return anything - returned value will be ignored anyway
                                beforeAllFilterFunc = () ->
                                    args = Array::slice.call(arguments, 0)
                                    _.each beforeAll, (method) ->
                                        method.apply(null, args)

                                filterFunc = () ->
                                    args = Array::slice.call(arguments, 0)
                                    res = _.reduce filters, (res, filter) ->
                                        return res && filter.apply(null, args)
                                    , true
                                    return res

                                @.streams[event] = @.inputs[name]
                                    .asKefirStream(event, getFieldData)
                                    .tap(beforeAllFilterFunc)
                                    .filter(filterFunc)

                                @.streams[event].onValue (data) ->
                                        pipeline(tasks, data)
                            , @
                        else if event is submitEvent
                            @.streams[submitEvent] = form
                                .asKefirStream(submitEvent)
                                .onValue (value) -> 
                                    pipeline(tasks, value)

                    , controller 

                    resolver.resolve()

        pluginObject = 
            context:
                destroy: (resolver, wire) ->
                    resolver.resolve()

            facets: 
                streams:
                    ready: streamsFacet

        return pluginObject