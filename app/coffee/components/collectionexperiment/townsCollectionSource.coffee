define [
    'cola/adapter/Array'
    'rest'
    'rest/interceptor/mime'
    'rest/interceptor/entity'
    'when'
], (ArrayAdapter, rest, mime, entity, When) ->

    serviceDefered = When.defer()

    client = rest.wrap(mime).chain(entity)

    client({path: '/service/aeroports'}).then(
        (response) ->
            source = new ArrayAdapter(response.airports)
            serviceDefered.resolve source
        , (error) ->
            console.log "SERVICE ERROR:", error
    )

    return serviceDefered.promise