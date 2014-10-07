define [
    "underscore"
    "jquery"
    "kefir"
    "kefirJquery"
], (_, $, kefir) ->

    class Controller

        $form: null

        onReady: ->
            console.log @form
            @$form = $(@form)

            fields = @getFileds(["lastName", "email"])
            streams = @getStreams(fields)

            console.log streams


        getFileds: (fieldNames) ->
            fields = _.map fieldNames, (name) =>
                @$form.find("input[name='" + name + "']")

        getValues: (fields) ->
            values = _.map fields, (field) ->
                field.val()

        getStreams: (fields, event) ->
            streams = _.map fields, (field) ->
                field.asKefirStream(event)

