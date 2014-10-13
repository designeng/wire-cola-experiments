define [
    "underscore"
    "jquery"
], (_, $) ->
    class Controller

        onReady: ->
            @display = @normalize @display
            @listRootNode = @display.find("ul")

        normalize: (view) ->
            return $(view)

        # @param {Object} obj 
        # @param {String} obj.name
        # @param {Object} obj.error
        displayError: (obj) ->
            if !obj.error
                @display.hide()
            else
                # all wrapped to arrays messages should be unwrapped
                messages = _.flatten obj.error.messages

                @listRootNode.html _.reduce messages, (content, text) ->
                    content += "<li>#{text}</li>"
                    return content
                , ""

                @display.addClass("layoutContent__errorDisplay__" + obj.name)

                console.log "@display HTML", @display.html()
                @display.show()

        hideError: ->
            @display.hide()