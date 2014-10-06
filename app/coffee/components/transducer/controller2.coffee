define [
    "underscore"
    "when"
    "when/sequence"
], (_, When, sequence) ->

    class Controller             

        onReady: ->
            points = 
                    "one":
                        rule: (value) ->
                            console.log "ONE", value
                            if value > 5
                                return false
                            else 
                                return true
                        message: "message_1: not more then"
                    "two":
                        rule: (value) ->
                            console.log "TWO", value
                            if value < 0
                                return false
                            else 
                                return true
                        message: "message_2: not less then"

            pointsToArray = (points) ->
                return _.values points

            doValidate = (value, points, successHandler, errorHandler) ->
                for item in pointsToArray(points)
                    if item.rule(value)
                        continue
                    else
                        errorHandler(item.message)
                        return
                successHandler()

            successHandler = (result) ->
                console.log "successHandler::::", result

            errorHandler = (message) ->
                console.log "errorHandler::::", message

            doValidate(3, points, successHandler, errorHandler)