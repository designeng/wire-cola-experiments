define [
    "underscore"
    "signals"
], (_, Signal) ->

    # _id is model(=item) ID for internal purposes
    setIdFor = (item) ->
        return _.extend item, {_id: _.uniqueId('c')}

    setIdsFor = (array) ->
        if array.length == 0
            return []
        else
            return _.map array, (item) ->
                setIdFor item

    class Collection

        # @param {Array} array: DEPRECATED!
        constructor: () ->
            @_source = []
            @_signal = new Signal()

        addSource: (array) ->
            if !_.isArray array
                array = []
            @_source = setIdsFor(array)
            return @_source

        getSource: () ->
            return @_source

        getSignal: ->
            return @_signal

        destroy: ->
            return @_signal.removeAll()

        addItem: (item) ->
            item = setIdFor item
            @_source.push item
            @_signal.dispatch("add", item)

        # @param {Object} itemAttributes - set of the attributes to identify item
        # @param {Object} options - additional attributes to extend existing item
        update: (itemAttributes, options) ->
            item = @find(itemAttributes)

            # omit null/undefined
            for key, value of options
                if typeof value == "null" || typeof value == "undefined"
                    delete options[key]
                    delete item[key]

            item = _.extend item, options
            @_signal.dispatch("update", item)
            return item

        # @param {String} _id - inner identifecator of the item
        remove: (_id) ->
            _.remove @_source, (item) ->
                return item["_id"] == _id

        # @param {Function} filter
        applyFilter: (filter) ->
            # filter should be applied on @
            @_source = _.filter @getSource(), filter, @
            return @_source

        # @param {Number} index - position in source array
        getItemAt: (index) ->
            return @_source[index]

        find: (attrs) ->
            item = _.find(@_source, attrs)
            return item

        where: (attrs) ->
            items = _.where(@_source, attrs)
            return items

        size: ->
            return @_source.length

        # @param {Function} iterator
        each: (iterator) ->
            if !_.isFunction iterator
                throw new Error "Iterator for Collection.each should be function!"
            _.forEach @source, iterator

        # TODO: add possibility to reset collection with array of items?
        reset: (items) ->
            if !items || !items.length
                @_source = []
            @_signal.dispatch("reset", @getSource())