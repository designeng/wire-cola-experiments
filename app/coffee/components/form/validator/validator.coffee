define [
    "underscore"
    "jquery"
    "when"
], (_, $, When) ->

	class Validator

		parsedStrategy: {}

		defaultPoint:
			rule: (value) -> if value is "" then false else true
			message: "Should not be empty!"

		parseStrategy: ->

			for fieldName, fieldPoints of @strategy
				fieldPoints = @stuffFieldPointsWithDefault(fieldPoints)
				@parsedStrategy[fieldName] = @normalizePoints(fieldPoints)

			console.log "parsedStrategy::::::::", @parsedStrategy

		validate: (fieldName, value) ->
			value = $.trim(value)

			points = @parsedStrategy[fieldName]

			iterator = (result, item) ->
				if result.messages
					return result
				else
					if !item.rule(value)
						result["messages"] = []
						result["messages"].push item.message
					return result

			result = _.reduce(points, iterator, {})

			console.log "result::::: for ", fieldName , "---", result

			return result

		stuffFieldPointsWithDefault: (fieldPoints) ->
			fieldPoints[0] = @defaultPoint
			return fieldPoints

		normalizePoints: (points) ->
			points = _.map points, (item) =>
				item.rule = @normalizeRule(item.rule)
				return item
			return points

		# we want deal with the function
		normalizeRule: (rule) ->
			if _.isFunction rule
				return rule
			else if _.isRegExp rule
				return (value) ->
					return value.match rule