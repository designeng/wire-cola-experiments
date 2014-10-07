define [
    "underscore"
    # "most"
], (_) ->

    class FormController

        testProp: "testProp"

        onReady: ->

        onValidationComplete: (target, formResult) ->
            console.log "onValidationComplete::::::::", target, formResult
            

        afterFieldValidation: (target, fieldName, result) =>

            console.log "afterFieldValidation::::", target, fieldName, result
            console.log "prop::::", @testProp

        pluginInvoker: (plugin, target, callback) ->
            console.log "PLUGIN", plugin, @
            console.log "TARGET IN CONTROLLER:::", target
            callback(1234567)

            



        # rules
        firstNameRule: (value) ->
            if value.length > 20
                return false
            else 
                return true