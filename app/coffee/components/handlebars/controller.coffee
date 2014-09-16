define [
    "jquery"
    "underscore"
], ($, _) ->

    class Controller

        onReady: ->
            # $(@collectionView).find(".inner").on "click", (e) ->
            #     console.log "inner element clicked" 

        onClick: (e) ->
            data = $(e.target)
                .closest('li')
                .attr('data-handlebars-id')

            if data
                console.log "CLICKED UPLEVEL ITEM:", data

        onClickInner: (e) ->
            console.log "inner element clicked"