define [
    "underscore"
    # "most"
], (_) ->

    class FormController

        testProp: "testProp"

        onReady: ->
            

        afterValidation: (target, errors) =>

            console.log "afterValidation::::", target, errors
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