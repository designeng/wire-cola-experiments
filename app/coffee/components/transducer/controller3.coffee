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
                        promise = When.promise (resolve, reject) ->
                            if isValid
                                resolve()
                            else
                                reject()
                                
                    ruleWithMessage = _.compose(throwErrorIfNotValid, item.rule)
                    result.push ruleWithMessage

                return result

            doValidate = (value, points, successHandler, errorHandler) ->
                validationPromise = When.all(extract(points))
                validationPromise.then(successHandler, errorHandler)

            successHandler = (result) ->
                console.log "successHandler::::", result

            errorHandler = (message) ->
                console.log "errorHandler::::", message

            doValidate(10, points, successHandler, errorHandler)


        testRegExp: ->
            regexp = /^([\da-zA-Z]{6})|(\d{3}\-?\d{3}\-?\d{3}\-?)$/g

            # regexp = /^(([a-zA-Z0-9]{5,})|(\d{3}\-?\d{3}\-?\d{3}\-?))$/

            str = "abc1AB"

            matched = regexp.exec str
            console.log matched, matched.length

            if matched
                for item in matched
                    console.log item