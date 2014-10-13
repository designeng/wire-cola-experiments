define [
    "underscore"
    "jquery"
    "when"
], (_, $, When) ->

	class Validator

		parsedStrategy: {}

		defaultPoint:
			rule: (value) -> if value is "" then false else true

		constructor: (options) ->
			@defaultPoint.message = options.defaultPointMessage || "Should not be empty!"
			for fieldName, fieldPoints of options.strategy
				fieldPoints = @stuffFieldPointsWithDefault(fieldPoints)
				@parsedStrategy[fieldName] = @normalizePoints(fieldPoints)

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