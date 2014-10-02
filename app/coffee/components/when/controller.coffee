define [
    "underscore"
    "when"
    "when/function"
    "when/pipeline"
    "when/sequence"
], (_, When, fn, pipeline, sequence) ->

    class Controller

        constructor: ->
            @basePromise = When.promise (resolve, reject) ->
                resolve(1)

            @basePromiseNo = When.promise (resolve, reject) ->
                setTimeout(()->
                    resolve(2)
                , 10000)
                

        onReady: ->
            promise1 = @basePromise.delay(1000)
            promise2 = @basePromiseNo


            When.all([promise1, promise2]).then (res) ->
                console.log "RES:::", res
            .otherwise (reason) ->
                # show message
                console.log "REJECTED:::", reason

        validate: ->

            strategyItem = 
                rule: (value) ->
                    if value.length > 5
                        return 0
                    else
                        return 1
                message: "Should not be more then 5"


            validationPoint = (item, value) ->
                if item.rule(value)
                    return true
                else
                    throw {
                        message: item.message
                    }

            fn.call(validationPoint, strategyItem, "1234567").then (res) ->
                console.log "RES::", res
            , (err) -> console.log "ERR:::", err

        validateWithSequence: ->

            fieldName = "firstName"
            fieldValue = "12345"

            strategyItem_1 = 
                rule: (value) ->
                    if value.length > 5
                        return 0
                    else
                        return 1
                message: "Should not be more then 5"

            strategyItem_2 = 
                rule: (value) ->
                    if value.match(/test/)
                        return 0
                    else
                        return 1
                message: "Should not have 'test"

            strategyItems = [strategyItem_1, strategyItem_2]

            validationReducer = (memo, item) ->
                memo = memo * item.rule(fieldValue)
                if !memo
                    throw {
                        message: item.message
                    }
                else return memo

            validationEnter = (items) ->
                _.reduce items, validationReducer, 1

            validationEnter2 = (items) ->
                return "validationEnter2"


            validationEnters = []
            validationEnters.push validationEnter
            # if needed we can add another validationEnter
            validationEnters.push validationEnter2

            # with every fieldName
            sequence(validationEnters, strategyItems).then (res) ->
                console.log "RES::", res
            , (err) -> console.log "ERR:::", err
            