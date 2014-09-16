define [
    "underscore"
], (_) ->

    sum = (memo, text) ->
        return memo + text

    transform = (list) ->

        for item in list
            if _.isObject item
                item["name"] = "NAME:::" + item["name"]
                item["hash"] = "HASH:::" + item["hash"]

        return list

    innerListTransformation = () ->
        return (fieldName) ->
            return transform @[fieldName]
