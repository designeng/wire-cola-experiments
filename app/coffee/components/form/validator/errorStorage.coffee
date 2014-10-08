define [
    "underscore"
], (_) ->

    class ErrorStorage

    	constructor: ->
    		@storage = {}

    	getValue: (name) ->
    		return {
    			name: name
    			messages: @storage[name]
    		}
    		
    	setValue: (name, messages) ->
    		@storage[name] = messages
