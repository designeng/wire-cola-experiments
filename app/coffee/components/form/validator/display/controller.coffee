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

        displayError: (error) ->
        	if !error.message
        		@display.hide()
        		return
        	else
        		@display.show()

	        	@display.html _.reduce(error, (content, text) ->
	        		content += "<li>#{text}</li>"
	        	, "")
