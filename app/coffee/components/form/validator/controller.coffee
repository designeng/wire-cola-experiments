define [
    "underscore"
    "jquery"
    "when"
    "kefir"
    "kefirJquery"
], (_, $, When, kefir) ->

    class Controller

        $form: null

        onReady: ->

            _.bindAll @, "getStoredError"

            @$form = $(@form)

            names = ["firstName", "email"]
            fields = @getFields(names)
            
            zippedFields = @getZippedFields(names, fields)

            for zip in zippedFields
                [name, field] = zip

                @fieldPropety(field, "change").onValue (v) ->
                    # validate it
                    console.log "VALUE:::", v

                When(@onFieldFocus(field, "focus", name, @getStoredError)).then (error) =>
                    @displayError(error)


        getFields: (fieldNames) ->
            fields = _.map fieldNames, (name) =>
                @$form.find("input[name='" + name + "']")

        getZippedFields: (names, fields) ->
            _.zip names, fields

        fieldPropety: (field, event) ->
            getValue = () ->
                field.val()
            field.asKefirStream(event, getValue)
                    .toProperty(getValue())

        onFieldFocus: (field, event, name, getStored) ->

            deffered = When.defer()

            onValueFn = () ->
                    storedError = getStored(name)
                    console.log "storedError:::", storedError
                    deffered.resolve(storedError)

            field.asKefirStream("focus").onValue onValueFn
            return deffered.promise

        # interaction with injected validator

        # interaction with injected error storage
        getStoredError: (fieldName) ->
            @errorStorage.getValue(fieldName)

        storeError: (fieldName, error) ->
            @errorStorage.getValue(fieldName, error)

        # interaction with injected error display
        displayError: (error) ->
            @errorDisplay.controller.displayError error


        # TODO: remove if not used
        getValues: (fields) ->
            values = _.map fields, (field) ->
                field.val()

        getStreams: (fields, event) ->
            streams = _.map fields, (field) ->
                field.asKefirStream(event)




