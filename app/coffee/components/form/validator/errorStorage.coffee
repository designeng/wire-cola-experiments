define [
    "underscore"
], (_) ->

    class ErrorStorage

    	constructor: ->
    		@storage = {}

    	getValue: (name) ->
    		return {
    			name: name
    			message: @storage[name]
    		}
    		
    	setValue: (name, message) ->
    		@storage[name] = message
