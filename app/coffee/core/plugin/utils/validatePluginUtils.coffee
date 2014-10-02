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
                return ruleFunction = (value) ->
                    # try
                    #     return value.match rule
                    # catch e
                    #     return false
                    
                    if value
                        return String::match.call value, rule
                    else
                        return false

        # @returns {Array}
        extractStrategies: (options) ->
            _strategies = []
            for name, strategies of options.fields
                _strategies.push _.values(strategies)[0]
            return _strategies

        toPromise: (func, message) ->
            promise = When.promise (resolve, reject, notify) ->
                isValid = func()
                if isValid
                    resolve(true)
                else
                    reject(message)
            return promise

        normalizeStrategyItem: (item) ->
            func = @normalizeRule(item.rule)
            # we should return item without message field - it's incapsulated in promise now
            _item = {}
            _item.rule = @toPromise(func, item.message)
            return _item

        normalizeStrategyItemsArray: (array) ->
            return _.map array, (item) =>
                return @normalizeStrategyItem(item)




        validate: () ->

