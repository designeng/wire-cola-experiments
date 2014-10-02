define [
    "underscore"
], (_) ->

    class FormController

        testProp: "testProp"

        onReady: ->
            

        afterValidation: (target, errors) =>

            console.log "afterValidation::::", target, errors
            console.log "prop::::", @testProp

            



        # rules
        firstNameRule: (value) ->
            if value.length > 20
                return false
            else 
                return true