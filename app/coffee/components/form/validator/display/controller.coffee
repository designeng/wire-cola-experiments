define [
    "underscore"
    "jquery"
    "when"
], (_, $, When) ->
    class Controller

        onReady: ->
            @display = @normalize @display

        normalize: (view) ->
            return $(view)

        displayError: (name, error) ->
            console.log "ERROR:::::::", name, error
            if !error.messages
                console.log name, "NO ERRORS"
                @display.hide()
            else
                messages = _.flatten error.messages

                console.log "messages>>>>>>>", messages

                @display.html _.reduce(messages, (content, text) ->
                    content += "<li>#{text}</li>"
                    console.log "content::::", content
                    return content
                , "")
                @display.show()
