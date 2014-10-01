define [
    "underscore"
], (_) ->

    class FormController

        onReady: ->

        formValidationBehaviourHandler: (target, errors) ->



        # rules
        firstNameRule: (value) ->
            if value.length > 20
                return false
            else 
                return true