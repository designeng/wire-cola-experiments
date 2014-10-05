define [
    "underscore"
    "when"
    "when/function"
    "when/pipeline"
    "when/sequence"
], (_, When, fn, pipeline, sequence) ->

    class Controller

        validationOptions:
            fields:
                firstName:
                    "not longer than 20 characters":
                        rule: (value) ->
                            if value.length > 20
                                return false
                            else
                                return true
                        message: "Should not be longer than 20 characters!"
                email:
                    "should have word '@'":
                        rule: /@/g
                        message: "Should have word '@'!"

        # every promise should be
        # promise = (name, value)
        # @returns 
        extractStrategies: (options) ->
            _strategies = []
            for name, strategies of options.fields
                _strategies.push _.values(strategies)[0]
            return _strategies

        ruleToPromiseArray: ->

            toPromise = (func, message) ->
                promise = When.promise (resolve, reject) ->
                    isValid = func()
                    if isValid
                        resolve(true)
                    else
                        reject(message)
                return promise

            console.log @extractStrategies @validationOptions

        wrapFunc: ->
            rule = (value) ->
                if value.length > 20
                    return false
                else
                    return true

            verdict = (isValid) ->
                if !isValid
                    return message
                else return value

            composedRule = _.compose(rule, verdict)

            composedRule(value, rule, message)





            