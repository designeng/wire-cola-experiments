define [
    'rest'
    'rest/interceptor/mime'
    'rest/interceptor/entity'
    'when'
], (rest, mime, entity, When) ->

    serviceDefered = When.defer()

    client = rest.wrap(mime).chain(entity)

    client({path: '/service/aeroports'}).then(
        (response) ->
            serviceDefered.resolve response.airports
        , (error) ->
            console.log "SERVICE ERROR:", error
    )

    return serviceDefered.promise