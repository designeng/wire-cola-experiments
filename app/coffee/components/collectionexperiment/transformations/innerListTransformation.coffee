define ->
    innerListTransformation = (fieldName) ->
        console.log "innerListTransformation::::", fieldName, @[fieldName]
        return "innerListTransformation here"
