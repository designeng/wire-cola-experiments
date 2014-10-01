define [
    "when"
    "underscore"
    "jquery"
], (When, _, $) ->

    class ValidatePluginUtils

        getFormElementValue: (form, name) ->
            return form.elements[name].value

        # we want deal with the function
        normalizeRule: (rule) ->
            if _.isFunction rule
                return rule
            else if _.isRegExp rule
                return ruleFunction = () ->
                    value = Array::slice.call(arguments, 0, 1)
                    return value.match rule

        # @returns {Array}
        extractStrategies: (options) ->
            _strategies = []
            for name, strategies of options.fields
                _strategies.push _.values(strategies)[0]
            return _strategies

        normalizeStrategyItem: (item) ->
            func = @normalizeRule(item.rule)
            console.log "func:::::::", func
            # item.rule = @toPromise(func, item.message)
            return item

        normalizeArray: (array) ->
            return _.map array, (item) =>
                return @normalizeStrategyItem(item)

        toPromise: (func, message) ->
            console.log "FUNC:::", func
            promise = When.promise (resolve, reject, notify) ->
                isValid = func()
                if isValid
                    resolve(true)
                else
                    reject(message)
            return promise

        pipelineStrategies: (strategies) ->
            for strategy in strategies
                console.log "strategy::::::::::", strategy
