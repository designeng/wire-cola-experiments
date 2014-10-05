define [
    "underscore"
    "when"
], (_, When) ->

    class Controller             

        onReady: ->
            points = 
                    "one":
                        rule: (value) ->
                            if value > 5
                                return false
                            else 
                                return true
                        message: "message_1"
                    "two":
                        rule: (value) ->
                            if value < 0
                                return false
                            else 
                                return true
                        message: "message_2"

            pointsToArray = (points) ->
                return _.values points


            extract = (points) ->
                result = []
                for item in pointsToArray(points)
                    throwErrorIfNotValid = (isValid) ->
                        console.log "isValid:::", isValid
                        if !isValid
                            throw new Error item.message
                        else
                            return 1
                    ruleWithMessage = _.compose(throwErrorIfNotValid, item.rule)
                    result.push ruleWithMessage

                return result

            filter = (value) ->
                return (result, rule) ->
                    res = rule(value)

                    if res
                        return result += " 1"
                    else
                        return result += " 0"

            doValidate = (value, points, successHandler, errorHandler) ->
                try
                    validationResult = _.reduce(extract(points), filter(value), "start")
                    successHandler(validationResult)
                catch error
                    errorHandler(error.message)

            successHandler = (result) ->
                console.log "successHandler::::", result

            errorHandler = (message) ->
                console.log "errorHandler::::", message

            doValidate(10, points, successHandler, errorHandler)