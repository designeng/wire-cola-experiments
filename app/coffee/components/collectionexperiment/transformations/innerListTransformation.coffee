define [
    "underscore"
], (_) ->

    sum = (memo, text) ->
        return memo + text

    processCollection = (itemPattern, list) ->

        result = []

        for item in list
            result.push _.template itemPattern, item

        result.unshift "<ul>"
        result.push "</ul>"

        resultHtml = _.reduce result, sum, ""

        return resultHtml

    innerListTransformation = (template) ->
        return (fieldName) ->
            return processCollection template, @[fieldName]
