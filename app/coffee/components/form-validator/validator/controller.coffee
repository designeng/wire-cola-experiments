define [
    "underscore"
    "jquery"
    "when"
], (_, $, When) ->

    class Controller

        form: null

        inputs: {}

        streams: {}

        errors: {}

        checkForRegistredError: (obj) ->
            if @errors[obj.name] then true else false

        getRegistredError: (obj) ->
            obj["error"] = @errors[obj.name]
            return obj

        hideError: (obj) ->
            @errorDisplay.controller.hideError()

        displayError: (obj) ->
            @errorDisplay.controller.displayError obj
            return obj

        validate: (obj) ->
            res = @validator.validate(obj.name, obj.value)
            if res.messages
                obj.error = res
            return obj

        registerError: (obj) ->
            if obj.error
                @errors[obj.name] = obj.error
            else
                delete @errors[obj.name]
            return obj

        highLight: (obj) ->
            if obj.error
                # TODO: use real classes
                @inputs[obj.name].css("background-color", "red")
            else
                @inputs[obj.name].css("background-color", "green")

        validateAll: ->
            firstDefectObjectInForm = undefined

            formData = {}

            for name in @fieldNames
                value = @inputs[name].val()
                formData[name] = value
                res = @validate({name: name, value: value})
                if res.error
                    obj = {name: name, value: value, error: res.error}
                    firstDefectObjectInForm = obj if !firstDefectObjectInForm

                    @highLight(obj)
                    @registerError(obj)

            # show error for first defect field in the form
            if firstDefectObjectInForm
                @displayError(firstDefectObjectInForm)
            else
                # no errors
                @successHandler(formData)
