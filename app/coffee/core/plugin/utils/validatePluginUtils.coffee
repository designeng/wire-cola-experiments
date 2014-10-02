define [
    "when"
    "when/sequence"
    "underscore"
    "jquery"
    "./form"
], (When, sequence, _, $, FormUtil) ->

    class ValidatePluginUtils
   
        target: null
        $target: null

        defaultInputEvent: "change"

        normalizeTarget: (target) ->
            if target instanceof jQuery
                return target
            else
                @target = target
                return $(target)

        registerTarget: (target) ->
            @$target = @normalizeTarget(target)
            return @$target

        unregisterTarget: ->
            @$target.unbind()

        defaultInputHandler: (options) ->
            inputEvent = options.event || @defaultInputEvent

        setInputHandler: (name, handler) ->
            $input = @$target.find("[name='#{name}']")
            handler = handler || @defaultInputHandler()
            $input.bind defaultInputEvent, handler

        getAllInputs: () ->
            inputs = @$target.each () ->
                $(@).filter(':input')

            # for input of inputs

        formElementFinder: (rootNode, nodeName) ->
            if rootNode.elements and rootNode.elements.length
                return rootNode.elements[nodeName]

        getFormElementValue: (form, name) ->
            return form.elements[name].value

        getAllFormValues: (form) ->
            console.log "@form:::", form
            # return formToObject(form)
            return FormUtil.getValues(form)

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
                    
                    if typeof value != "undefined"
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

        getRulesArray: (array) ->
            return _.map array, (item) =>
                return item.rule




        validate: (extracted, valuesInArray) ->
            return sequence(extracted).then (res) ->
                console.log "RES::", res
            , (err) -> console.log "ERR:::", err

